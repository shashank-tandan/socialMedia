const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all users
router.get('/', async (req, res) => {
  try {
    const [users] = await db.query('SELECT * FROM Users');
    res.json(users);
    res.send("Users fetched successfully"); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  const { Name, Email, Password_Hash, Role } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Users (Name, Email, Password_Hash, Role) VALUES (?, ?, ?, ?)',
      [Name, Email, Password_Hash, Role]
    );
    res.status(201).json({ userId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

