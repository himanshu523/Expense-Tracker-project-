const path = require ('path');

const rootDir = require('../util/path');

const User = require('../model/user');

exports.getSignUp = async (req,res,next)=>{
    console.log("SIGNUP PAGE");
    res.sendFile(path.join(rootDir,"view","signup.html"));
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
            else{
                return res.status(500).json({success:false,message:badparameters});
            }
        }

        
     
}