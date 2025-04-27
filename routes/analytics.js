const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /analytics
router.get('/', async (req, res) => {
  try {
    const [[{ totalUsers }]] = await db.query('SELECT COUNT(*) AS totalUsers FROM Users');
    const [[{ totalPosts }]] = await db.query('SELECT COUNT(*) AS totalPosts FROM Posts');

    // Dummy engagement rate calculation
    const engagementRate = totalUsers && totalPosts ? ((totalPosts / totalUsers) * 10).toFixed(2) : 0;

    // Dummy monthly engagement data (this could be generated dynamically later)
    const engagementData = [65, 59, 80, 81, 56, 55];

    res.json({
      totalUsers,
      totalPosts,
      engagementRate,
      engagementData
    });
  } catch (err) {
    console.error('Error fetching analytics:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
