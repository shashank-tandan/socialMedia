const express = require('express');
const router = express.Router();
const db = require('../db');

// Like a post
router.post('/', async (req, res) => {
  const { UserID, PostID } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Likes (UserID, PostID) VALUES (?, ?)',
      [UserID, PostID]
    );
    res.status(201).json({ likeId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
