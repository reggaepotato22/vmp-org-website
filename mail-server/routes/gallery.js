const express = require('express');
const router = express.Router();
const { pool } = require('../database/db');
const { authenticateToken } = require('../middleware/authMiddleware');

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM gallery ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get items by mission
router.get('/mission/:missionId', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM gallery WHERE mission_id = ? ORDER BY created_at DESC', [req.params.missionId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create item (Protected)
router.post('/', authenticateToken, async (req, res) => {
  const { title, category, image_url, mission_id, featured } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO gallery (title, category, image_url, mission_id, featured) VALUES (?, ?, ?, ?, ?)',
      [title, category || 'general', image_url, mission_id || null, featured || false]
    );
    const [newItem] = await pool.query('SELECT * FROM gallery WHERE id = ?', [result.insertId]);
    res.status(201).json(newItem[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update item (Protected)
router.put('/:id', authenticateToken, async (req, res) => {
  const { title, category, featured, mission_id } = req.body;
  try {
    await pool.query(
      'UPDATE gallery SET title = ?, category = ?, featured = ?, mission_id = ? WHERE id = ?',
      [title, category, featured, mission_id, req.params.id]
    );
    const [updated] = await pool.query('SELECT * FROM gallery WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete item (Protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM gallery WHERE id = ?', [req.params.id]);
    res.json({ message: 'Gallery item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
