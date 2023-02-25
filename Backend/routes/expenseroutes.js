const express = require('express');
const router = express.Router();
const expenseControllers = require('../controllers/expenseControllers')

const userAuthenticate = require('../middleware/auth');

router.post('/addExpense',userAuthenticate.authenticate, expenseControllers.addExpense);

router.get('/expensesData/:pageNo', userAuthenticate.authenticate , expenseControllers.getExpenses);

router.delete('/deleteExpense/:expenseid',userAuthenticate.authenticate, expenseControllers.deleteExpense);

router.get('/download',userAuthenticate.authenticate, expenseControllers.downloadexpense);

router.get('/get-downloads', userAuthenticate.authenticate, expenseControllers.getDownloads);



module.exports = router;