 
const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const { getAuditLogs } = require('../models/auditLog');

router.get('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const logs = await getAuditLogs();
    res.json(logs);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch audit logs' });
  }
});

module.exports = router;