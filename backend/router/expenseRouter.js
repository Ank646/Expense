const { filterExpenses, getTotalExpenses,createExpense, deleteExpense, getCategoryExpense, getAllExpenses, emailSender } = require('../controller/expenseController');

const router = require('express').Router();

router.post('/addExpense',createExpense)
router.post('/deleteExpense',deleteExpense)
router.post('/categoryExpense',getCategoryExpense)
router.post('/allExpenses',getAllExpenses)
router.post('/sendEmail',emailSender);

router.get('/expenses', filterExpenses);
router.get('/expenses/total', getTotalExpenses);
module.exports = router;