const express = require('express');
const router = express.Router();
const expenseControllers = require('../controllers/expenseControllers')

const userAuthenticate = require('../middleware/auth');

router.post('/addExpense',userAuthenticate.authenticate, expenseControllers.addExpense);

router.get('/getExpense',userAuthenticate.authenticate, expenseControllers.getExpense);

router.delete('/deleteExpense/:expenseid',userAuthenticate.authenticate, expenseControllers.deleteExpense);



module.exports = router;