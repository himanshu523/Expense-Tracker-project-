const express = require('express');

const router =express.Router();

const userAuthenticate = require('../middleware/auth');

const premiumControllers = require('../controllers/premiumcontrollers');

router.get('/showLeaderboard',userAuthenticate.authenticate,premiumControllers.getUserLeaderboard);


module.exports= router;