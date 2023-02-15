
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
    totalExpenses:{
        type:Sequelize.INTEGER,
        defaultValue:0,
    }

   }
)

const Expense = require('./expense')
const Order = require('./orders');
const forgotPassword = require('./forgotpassword')
const Download = require('./download')

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(forgotPassword);
forgotPassword.belongsTo(User);

User.hasMany(Download);
Download.belongsTo(User);

sequelize.sync().then((res)=>{
    console.log('usersequelized')
}).catch(err=>console.log(err));

module.exports = User;