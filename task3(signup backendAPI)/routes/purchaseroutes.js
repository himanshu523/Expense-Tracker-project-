const express = require('express');

const purchasecontrollers = require('../controllers/purchaseControllers');

const authenticatemiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/premiummembership', authenticatemiddleware.authenticate,purchasecontrollers.purchasepremium);

router.post('/updatetransactionstatus', authenticatemiddleware.authenticate, purchasecontrollers.updateTransactionStatus)

module.exports = router