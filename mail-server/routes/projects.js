const express = require('express');
const router = express.Router();
const { pool } = require('../database/db');
const { authenticateToken } = require('../middleware/authMiddleware');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const [projects] = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const [projects] = await pool.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (projects.length === 0) return res.status(404).json({ message: 'Project not found' });
    res.json(projects[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create Project (Protected)
router.post('/', authenticateToken, async (req, res) => {
  const { title, slug, description, status, cover_image, start_date, end_date, featured } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO projects (title, slug, description, status, cover_image, start_date, end_date, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, slug, description, status, cover_image, start_date, end_date, featured]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Project (Protected)
router.put('/:id', authenticateToken, async (req, res) => {
  const { title, slug, description, status, cover_image, start_date, end_date, featured } = req.body;
  try {
    await pool.query(
      'UPDATE projects SET title = ?, slug = ?, description = ?, status = ?, cover_image = ?, start_date = ?, end_date = ?, featured = ? WHERE id = ?',
      [title, slug, description, status, cover_image, start_date, end_date, featured, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Project (Protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
