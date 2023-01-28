const path = require ('path');

const rootDir = require('../util/path');

const User = require('../model/user');

const bcrypt = require('bcrypt');

const saltRounds = 10;


exports.getLogin = async (req,res,next)=>{
    console.log("LOGIN PAGE");
    res.sendFile(path.join(rootDir,"view","login.html"));
}

exports.getSignup = async(req,res,next)=>{
    console.log('SIGNUP PAGE');
    res.sendFile(path.join(rootDir,'view','signup.html'))
}

exports.addUser = (req,res,next)=>{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if(name.length>0 && email.length>0 && password.length>0)
        {
            
            bcrypt.hash(password, saltRounds, async function(error, hash) {
                // Store hash in your password DB.
                try{
                await User.create(
                    {
                        name: name, 
                        email: email, 
                        password: hash
                    })
                        res.status(201).send({success: true, message: 'new user created'});
                  }
                    catch(err){
                        if(err.name ==='SequelizeUniqueConstraintError')
                        {
                            return res.status(403).json({success:true,message:err.name});
                        }
                        };
                }) ;         
    }
    else
    {
        res.status(400).json({success:false,message:'bad parameters'});
    } 
  
     
}

exports.postLogin =async (req,res,next)=>{
      const email= req.body.email;
      const password = req.body.password;
    
      try{
        const users = await User.findAll({where:{email:email}});
        //console.log(users[0]);
        const user =users[0]
        if(!user)
        {
            console.log('no user');
            return  res.status(404).json({success:false,message:'user doesnt exist'})
        }
        //console.log(user.password);
        bcrypt.compare(password,user.password,(err,result)=>{
            if(err)
            {
                throw new Error('something went wrong');
            }
            if(result===true)
            {
                console.log('password match')
                res.status(200).json({success:true,message:'user found'})
            }
            else{
                res.status(401).json({success:false,message:'incorrect password'});
            }
        })
      }
      catch(err)
      {
        console.log(err);
        res.status(500).json({success:false,message:err})
      }

}