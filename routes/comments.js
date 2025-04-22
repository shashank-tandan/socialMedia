const express = require('express');
const router = express.Router();
const db = require('../db');

// Add a comment to a post
router.post('/', async (req, res) => {
  const { UserID, PostID, Content } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Comments (UserID, PostID, Content) VALUES (?, ?, ?)',
      [UserID, PostID, Content]
    );
    res.status(201).json({ commentId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
