const express = require('express');
const router = express.Router();
const { pool } = require('../database/db');
const { authenticateToken } = require('../middleware/authMiddleware');

// Get all missions
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM missions ORDER BY start_date DESC');
    // Parse JSON fields
    const missions = rows.map(m => ({
      ...m,
      images: typeof m.images === 'string' ? JSON.parse(m.images) : m.images,
      stats: typeof m.stats === 'string' ? JSON.parse(m.stats) : m.stats
    }));
    res.json(missions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single mission
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM missions WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Mission not found' });
    const m = rows[0];
    const mission = {
      ...m,
      images: typeof m.images === 'string' ? JSON.parse(m.images) : m.images,
      stats: typeof m.stats === 'string' ? JSON.parse(m.stats) : m.stats
    };
    res.json(mission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create mission (Protected)
router.post('/', authenticateToken, async (req, res) => {
  const { title, location, start_date, end_date, description, content, cover_image, status, images, stats, report_file, report_summary, gallery_link } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO missions 
      (title, location, start_date, end_date, description, content, cover_image, status, images, stats, report_file, report_summary, gallery_link) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title, 
        location, 
        start_date, 
        end_date, 
        description, 
        content || '', 
        cover_image, 
        status || 'upcoming', 
        JSON.stringify(images || []), 
        JSON.stringify(stats || {}),
        report_file || null,
        report_summary || '',
        gallery_link || ''
      ]
    );
    const [newMission] = await pool.query('SELECT * FROM missions WHERE id = ?', [result.insertId]);
    res.status(201).json(newMission[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update mission (Protected)
router.put('/:id', authenticateToken, async (req, res) => {
  const { title, location, start_date, end_date, description, content, cover_image, status, images, stats, report_file, report_summary, gallery_link } = req.body;
  try {
    await pool.query(
      `UPDATE missions SET 
      title = ?, location = ?, start_date = ?, end_date = ?, description = ?, content = ?, cover_image = ?, status = ?, images = ?, stats = ?, report_file = ?, report_summary = ?, gallery_link = ?
      WHERE id = ?`,
      [
        title, 
        location, 
        start_date, 
        end_date, 
        description, 
        content || '', 
        cover_image, 
        status, 
        JSON.stringify(images || []), 
        JSON.stringify(stats || {}), 
        report_file || null, 
        report_summary || '', 
        gallery_link || '',
        req.params.id
      ]
    );
    const [updated] = await pool.query('SELECT * FROM missions WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete mission (Protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM missions WHERE id = ?', [req.params.id]);
    res.json({ message: 'Mission deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
