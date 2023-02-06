
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
    },
    ispremium:Sequelize.BOOLEAN,

   }
)

const Expense = require('./expense')
const Order = require('./orders');

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync().then((res)=>{
    console.log('usersequelized')
}).catch(err=>console.log(err));

module.exports = User;