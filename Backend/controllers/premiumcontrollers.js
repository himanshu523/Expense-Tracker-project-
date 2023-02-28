const User = require('../model/user');  

const Expense =require('../model/expense');

const sequelize=require('../util/database');

const getUserLeaderboard = async(req,res,next)=>{
    try{
       const leaderBoardofUser = await User.findAll({
        
        order:[['totalExpenses','DESC']]
       });
    
       //console.log(leaderBoardofUser);
       res.status(200).json(leaderBoardofUser)

    }
    catch(err)
    {
         console.log(err);
         res.status(500).json(err);
    }

}

module.exports={
    getUserLeaderboard,
}