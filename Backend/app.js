const express = require('express');

const app = express();

require('dotenv').config();

const fs = require('fs');

const path = require('path');

const morgan =require('morgan');
const helmet = require('helmet');

app.use(helmet());



const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    {flags: 'a'}
);

app.use(morgan('combined', {stream: accessLogStream}));



const bodyParser = require('body-parser');



const userRoutes = require('./routes/userroutes');

const expenseRoutes = require('./routes/expenseroutes');

const purchaseRoutes = require('./routes/purchaseroutes');

const passwordRoutes = require('./routes/passwordroutes');

const premiumRoutes = require('./routes/premiumroutes');

const errorControllers = require('./controllers/errorcontrollers');

const Sequelize = require('sequelize');

const sequelize = require('./util/database');
const User = require('./model/expense');
const Expense = require('./model/expense');

var cors = require("cors");
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({extended:false}));

app.get('/favicon.ico',(req,res)=>  res.status(204).end());

app.use('/user',userRoutes);

app.use('/expense',expenseRoutes);

app.use('/purchase',purchaseRoutes);

app.use('/password',passwordRoutes);

app.use('/premium',premiumRoutes);

app.use(errorControllers.err404);



//sequelize.sync({fo}).then(()=>{
    app.listen(process.env.PORT||3000);
//}).catch(err=>console.log(err));