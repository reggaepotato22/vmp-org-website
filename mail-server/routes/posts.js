const express = require('express');
const router = express.Router();
const { pool } = require('../database/db');
const { authenticateToken } = require('../middleware/authMiddleware');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const [posts] = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get post by ID
router.get('/:id', async (req, res) => {
  try {
    const [posts] = await pool.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    if (posts.length === 0) return res.status(404).json({ message: 'Post not found' });
    res.json(posts[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create Post (Protected)
router.post('/', authenticateToken, async (req, res) => {
  const { title, slug, excerpt, content, cover_image, status, mission_id, tags } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO posts (title, slug, excerpt, content, cover_image, status, mission_id, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, slug, excerpt, content, cover_image, status, mission_id, JSON.stringify(tags)]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Post (Protected)
router.put('/:id', authenticateToken, async (req, res) => {
  const { title, slug, excerpt, content, cover_image, status, mission_id, tags } = req.body;
  try {
    await pool.query(
      'UPDATE posts SET title = ?, slug = ?, excerpt = ?, content = ?, cover_image = ?, status = ?, mission_id = ?, tags = ? WHERE id = ?',
      [title, slug, excerpt, content, cover_image, status, mission_id, JSON.stringify(tags), req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Post (Protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
