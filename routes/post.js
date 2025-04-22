const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const [posts] = await db.query('SELECT * FROM Posts');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  const { UserID, Content, Visibility } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Posts (UserID, Content, Visibility) VALUES (?, ?, ?)',
      [UserID, Content, Visibility]
    );
    res.status(201).json({ postId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
