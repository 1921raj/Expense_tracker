 
const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const { createExpense, getUserExpenses, getAllExpenses, updateExpenseStatus } = require('../models/expense');
const { createAuditLog } = require('../models/auditLog');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

router.post('/', verifyToken, async (req, res) => {
  try {
    const { amount, category, date, notes } = req.body;
    const expense = await createExpense(req.user.id, amount, category, date, notes);
    await createAuditLog(req.user.id, 'create_expense', `Created expense #${expense.id}`);
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create expense' });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const expenses = req.user.role === 'admin' ? await getAllExpenses() : await getUserExpenses(req.user.id);
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch expenses' });
  }
});

router.put('/:id/status', verifyToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const expense = await updateExpenseStatus(req.params.id, status);
    await createAuditLog(req.user.id, 'update_expense_status', `Changed expense #${req.params.id} to ${status}`);
    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update expense status' });
  }
});

router.get('/export', verifyToken, isAdmin, async (req, res) => {
  try {
    const expenses = await getAllExpenses();
    const csvWriter = createCsvWriter({
      path: 'expenses.csv',
      header: [
        { id: 'id', title: 'ID' },
        { id: 'email', title: 'User Email' },
        { id: 'amount', title: 'Amount' },
        { id: 'category', title: 'Category' },
        { id: 'date', title: 'Date' },
        { id: 'notes', title: 'Notes' },
        { id: 'status', title: 'Status' },
      ]
    });
    await csvWriter.writeRecords(expenses);
    res.download('expenses.csv');
  } catch (error) {
    res.status(400).json({ error: 'Failed to export expenses' });
  }
});

module.exports = router;