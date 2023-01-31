const express = require('express');
const router = express.Router();
const expenseControllers = require('../controllers/expenseControllers')

router.get('/',expenseControllers.gethtml);

router.post('/addExpense', expenseControllers.addExpense);

router.get('/getExpense', expenseControllers.getExpense);

router.delete('/deleteExpense/:expenseid', expenseControllers.deleteExpense);

module.exports = router;