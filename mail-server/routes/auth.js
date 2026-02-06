const express = require('express');
const router = express.Router();
const { pool } = require('../database/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken, JWT_SECRET } = require('../middleware/authMiddleware');

// Login
router.post('/login', async (req, res) => {
  const { password } = req.body;
  const ADMIN_PASSWORD = 'admin123'; // Simple password-based auth

  try {
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: 'admin', role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    
    res.json({ token, user: { id: 'admin', role: 'admin' } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Current User (Verify Token)
router.get('/me', authenticateToken, async (req, res) => {
  res.json({ id: 'admin', role: 'admin' });
});

module.exports = router;
