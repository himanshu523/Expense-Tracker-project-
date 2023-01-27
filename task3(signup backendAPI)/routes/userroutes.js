const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/usercontrollers');

router.get('/',userControllers.getSignUp);

router.post('/addUser',userControllers.addUser);


module.exports = router;