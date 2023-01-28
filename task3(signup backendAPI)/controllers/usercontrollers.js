const path = require ('path');

const rootDir = require('../util/path');

const User = require('../model/user');

exports.getLogin = async (req,res,next)=>{
    console.log("LOGIN PAGE");
    res.sendFile(path.join(rootDir,"view","login.html"));
}

exports.getSignup = async(req,res,next)=>{
    console.log('SIGNUP PAGE');
    res.sendFile(path.join(rootDir,'view','signup.html'))
}

exports.addUser = async(req,res,next)=>{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
     try{
        await User.create({
            name:name,
            email:email,
            password:password,
        })  //.then(()=>{     }).
            res.status(201).json({success:true,message:' created new user'});
        }
       catch(err){
            if(err.name ==='SequelizeUniqueConstraintError')
            {
                return res.status(403).json({success:true,message:err.name});
            }
        
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
            return  res.status(400).json({message:'user doesnt exist'})
        }
        //console.log(user.password);
        if(user.password === password)
        {
            console.log('password match')
            res.status(200).json({message:'user found'})
        }
        else{
            res.status(401).json({message:'incorrect password'});
        }
      }
      catch(err)
      {
        console.log(err);
        res.status(500).json({message:err})
      }

}