const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authenticateToken } = require('../middleware/authMiddleware');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Sanitize filename and append timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (file.mimetype.startsWith('image/') || allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      // Allow if extension matches common docs just in case mimetype varies
      const ext = path.extname(file.originalname).toLowerCase();
      if (['.pdf', '.doc', '.docx'].includes(ext)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only images, PDF, and DOC/DOCX are allowed.'));
      }
    }
  }
});

// Upload endpoint
router.post('/', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  // Return the full URL (Assuming server runs on same host/port logic or relative path)
  // For production, this should be configurable. For now, we return relative path.
  // Frontend will prepend API URL if needed, or we return full URL based on req.protocol/host.
  
  // We'll return the path relative to the server root, e.g. /uploads/filename.jpg
  // The server.js will serve /uploads statically.
  const fileUrl = `/uploads/${req.file.filename}`;
  
  res.json({ url: fileUrl });
});

module.exports = router;
