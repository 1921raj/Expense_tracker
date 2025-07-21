 
const pool = require('../config/db');

const createAuditLog = async (userId, action, details) => {
  await pool.query(
    'INSERT INTO audit_logs (user_id, action, details) VALUES ($1, $2, $3)',
    [userId, action, details]
  );
};

const getAuditLogs = async () => {
  const result = await pool.query('SELECT al.*, u.email FROM audit_logs al JOIN users u ON al.user_id = u.id ORDER BY created_at DESC');
  return result.rows;
};

module.exports = { createAuditLog, getAuditLogs };