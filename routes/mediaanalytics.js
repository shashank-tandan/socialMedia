const express = require('express');
const router = express.Router();
const db = require('../db'); // your DB connection

// POST /mediaanalytics — Insert new analytics record
router.post('/', async (req, res) => {
  const { MediaID, Views = 0, Likes = 0, Shares = 0 } = req.body;

  if (!MediaID) {
    return res.status(400).json({ error: 'MediaID is required.' });
  }

  try {
    const sql = 'INSERT INTO MediaAnalytics (MediaID, Views, Likes, Shares) VALUES (?, ?, ?, ?)';
    await db.query(sql, [MediaID, Views, Likes, Shares]);
    res.status(201).json({ message: '✅ Media analytics recorded successfully.' });
  } catch (error) {
    console.error('Error inserting media analytics:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// GET /mediaanalytics — Fetch all analytics
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM MediaAnalytics ORDER BY Created_At DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching media analytics:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// GET /mediaanalytics/:mediaId — Fetch analytics for a specific media
router.get('/:mediaId', async (req, res) => {
  const { mediaId } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM MediaAnalytics WHERE MediaID = ?', [mediaId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No analytics found for this MediaID.' });
    }
    res.json(rows);
  } catch (error) {
    console.error('Error fetching specific media analytics:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
