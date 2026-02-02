const express = require('express');
const router = express.Router();
const { pool } = require('../database/db');
const { authenticateToken } = require('../middleware/authMiddleware');

// Get all news
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM news ORDER BY date DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single news
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'News not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create news (Protected)
router.post('/', authenticateToken, async (req, res) => {
  const { title, content, image_url, category, date } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO news (title, content, image_url, category, date) VALUES (?, ?, ?, ?, ?)',
      [title, content, image_url, category, date]
    );
    const [newItem] = await pool.query('SELECT * FROM news WHERE id = ?', [result.insertId]);
    res.status(201).json(newItem[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update news (Protected)
router.put('/:id', authenticateToken, async (req, res) => {
  const { title, content, image_url, category, date } = req.body;
  try {
    await pool.query(
      'UPDATE news SET title = ?, content = ?, image_url = ?, category = ?, date = ? WHERE id = ?',
      [title, content, image_url, category, date, req.params.id]
    );
    const [updated] = await pool.query('SELECT * FROM news WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete news (Protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM news WHERE id = ?', [req.params.id]);
    res.json({ message: 'News deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
