const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/usercontrollers');

const userAuthenticate = require('../middleware/auth');




router.post('/addUser',userControllers.addUser);

router.post('/login',userControllers.postLogin);




module.exports = router;