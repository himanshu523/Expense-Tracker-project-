
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('users',{
    id:{
         type:Sequelize.INTEGER,
         allowNull:false,
         primaryKey:true,
         autoIncrement:true,

    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    }

   }
)

const Expense = require('./expense')

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync().then((res)=>{
    console.log('usersequelized')
}).catch(err=>console.log(err));

module.exports = User;