const express = require('express');
const router = express.Router();
const { pool } = require('../database/db');
const { authenticateToken } = require('../middleware/authMiddleware');

// Get all team members
router.get('/', async (req, res) => {
  try {
    const [members] = await pool.query('SELECT * FROM team_members ORDER BY display_order ASC');
    res.json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get team member by ID
router.get('/:id', async (req, res) => {
  try {
    const [members] = await pool.query('SELECT * FROM team_members WHERE id = ?', [req.params.id]);
    if (members.length === 0) return res.status(404).json({ message: 'Team member not found' });
    res.json(members[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create Team Member (Protected)
router.post('/', authenticateToken, async (req, res) => {
  const { name, role, photo_url, bio, email, phone, social_links, display_order, active } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO team_members (name, role, photo_url, bio, email, phone, social_links, display_order, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, role, photo_url, bio, email, phone, JSON.stringify(social_links), display_order, active]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Team Member (Protected)
router.put('/:id', authenticateToken, async (req, res) => {
  const { name, role, photo_url, bio, email, phone, social_links, display_order, active } = req.body;
  try {
    await pool.query(
      'UPDATE team_members SET name = ?, role = ?, photo_url = ?, bio = ?, email = ?, phone = ?, social_links = ?, display_order = ?, active = ? WHERE id = ?',
      [name, role, photo_url, bio, email, phone, JSON.stringify(social_links), display_order, active, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Team Member (Protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM team_members WHERE id = ?', [req.params.id]);
    res.json({ message: 'Team member deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
