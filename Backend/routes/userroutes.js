const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/usercontrollers');

router.get('/',userControllers.getLogin);

router.post('/addUser',userControllers.addUser);

router.post('/login',userControllers.postLogin)

router.get('/signup',userControllers.getSignup);


module.exports = router;