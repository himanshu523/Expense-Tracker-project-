const express = require('express');
const router = express.Router();

const passwordControllers = require('../controllers/passwordcontrollers');


router.post('/forgotpassword', passwordControllers.forgotPassword);

router.get('/resetpassword/:id', passwordControllers.resetPassword);

router.get('/updatepassword/:id', passwordControllers.updatePassword);

module.exports = router;