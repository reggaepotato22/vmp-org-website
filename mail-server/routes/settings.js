const express = require('express');
const router = express.Router();
const { pool } = require('../database/db');
const { authenticateToken } = require('../middleware/authMiddleware');

// Get all settings
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM site_settings');
    // Convert to object { key: value }
    const settings = rows.reduce((acc, row) => {
      acc[row.setting_key] = row.setting_value;
      return acc;
    }, {});
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update settings (Protected)
// Expects body: { key: value, key2: value2 }
router.post('/', authenticateToken, async (req, res) => {
  const updates = req.body;
  const keys = Object.keys(updates);
  
  if (keys.length === 0) return res.json({ message: 'No updates provided' });

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    for (const key of keys) {
      // Upsert logic (Insert on duplicate key update)
      await connection.query(
        'INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
        [key, updates[key], updates[key]]
      );
    }
    
    await connection.commit();
    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

module.exports = router;
