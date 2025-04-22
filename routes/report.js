const express = require('express');
const router = express.Router();
const db = require('../db');

// Report a post
router.post('/', async (req, res) => {
  const { ReporterID, ReportedPostID, Reason } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO ContentReports (ReporterID, ReportedPostID, Reason) VALUES (?, ?, ?)',
      [ReporterID, ReportedPostID, Reason]
    );
    res.status(201).json({ reportId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
