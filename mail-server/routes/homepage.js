const express = require('express');
const router = express.Router();
const { pool } = require('../database/db');
const { authenticateToken } = require('../middleware/authMiddleware');

// --- Slides ---

router.get('/slides', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM hero_slides ORDER BY order_index ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/slides', authenticateToken, async (req, res) => {
  const { title, subtitle, description, image, order_index, active } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO hero_slides (title, subtitle, description, image, order_index, active) VALUES (?, ?, ?, ?, ?, ?)',
      [title, subtitle, description, image, order_index || 0, active !== undefined ? active : true]
    );
    const [newItem] = await pool.query('SELECT * FROM hero_slides WHERE id = ?', [result.insertId]);
    res.status(201).json(newItem[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/slides/:id', authenticateToken, async (req, res) => {
  const { title, subtitle, description, image, order_index, active } = req.body;
  try {
    await pool.query(
      'UPDATE hero_slides SET title = ?, subtitle = ?, description = ?, image = ?, order_index = ?, active = ? WHERE id = ?',
      [title, subtitle, description, image, order_index, active, req.params.id]
    );
    const [updated] = await pool.query('SELECT * FROM hero_slides WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/slides/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM hero_slides WHERE id = ?', [req.params.id]);
    res.json({ message: 'Slide deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Testimonials ---

router.get('/testimonials', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/testimonials', authenticateToken, async (req, res) => {
  const { name, role, content, image_url, rating } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO testimonials (name, role, content, image_url, rating) VALUES (?, ?, ?, ?, ?)',
      [name, role, content, image_url, rating || 5]
    );
    const [newItem] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [result.insertId]);
    res.status(201).json(newItem[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/testimonials/:id', authenticateToken, async (req, res) => {
  const { name, role, content, image_url, rating } = req.body;
  try {
    await pool.query(
      'UPDATE testimonials SET name = ?, role = ?, content = ?, image_url = ?, rating = ? WHERE id = ?',
      [name, role, content, image_url, rating, req.params.id]
    );
    const [updated] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/testimonials/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
