 
const pool = require('../config/db');

const createExpense = async (userId, amount, category, date, notes) => {
  const result = await pool.query(
    'INSERT INTO expenses (user_id, amount, category, date, notes, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [userId, amount, category, date, notes, 'pending']
  );
  return result.rows[0];
};

const getUserExpenses = async (userId) => {
  const result = await pool.query('SELECT * FROM expenses WHERE user_id = $1', [userId]);
  return result.rows;
};

const getAllExpenses = async () => {
  const result = await pool.query('SELECT e.*, u.email FROM expenses e JOIN users u ON e.user_id = u.id');
  return result.rows;
};

const updateExpenseStatus = async (expenseId, status) => {
  const result = await pool.query(
    'UPDATE expenses SET status = $1 WHERE id = $2 RETURNING *',
    [status, expenseId]
  );
  return result.rows[0];
};

module.exports = { createExpense, getUserExpenses, getAllExpenses, updateExpenseStatus };