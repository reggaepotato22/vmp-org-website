const express = require('express');
const router = express.Router();
const { pool } = require('../database/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken, JWT_SECRET } = require('../middleware/authMiddleware');

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    
    // Remove password hash from response
    delete user.password_hash;
    
    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Current User (Verify Token)
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, email, created_at FROM users WHERE id = ?', [req.user.id]);
    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
