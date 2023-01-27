const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const path = require('path');

const userRoutes = require('./routes/userroutes');

const errorControllers = require('./controllers/errorcontrollers');

const Sequelize = require('sequelize');

const sequelize = require('./util/database');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({extended:false}));

app.get('/favicon.ico',(req,res)=>  res.status(204).end());

app.use(userRoutes);

app.use(errorControllers.err404);

sequelize.sync().then(()=>{
    app.listen(3000);
}).catch(err=>console.log(err));