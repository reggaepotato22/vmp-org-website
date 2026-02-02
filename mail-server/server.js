const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const { runMigrations } = require('./database/db');

// Route Imports
const authRoutes = require('./routes/auth');
const missionRoutes = require('./routes/missions');
const galleryRoutes = require('./routes/gallery');
const settingsRoutes = require('./routes/settings');
const newsRoutes = require('./routes/news');
const homepageRoutes = require('./routes/homepage');
const uploadRoutes = require('./routes/upload');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Static Files (Uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/homepage', homepageRoutes);
app.use('/api/upload', uploadRoutes);

// Legacy Contact Route (Integrated directly)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

app.post('/api/contact', async (req, res) => {
    const { name, email, interest, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: `New Inquiry: ${interest || 'General'} from ${name}`,
            replyTo: email,
            text: `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\n${message}`
        });
        res.status(200).json({ success: true, message: 'Message sent!' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
});

// Start Server & Run Migrations
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await runMigrations();
});
