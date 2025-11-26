// --- CommonJS Syntax Used Here to Resolve Module Error ---

const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config(); 

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
// const path = require('path'); // Path module is no longer necessary

const app = express();
// Use the PORT variable from your .env file, defaulting to 3001
const PORT = process.env.PORT || 3001; 

// --- Middleware Configuration ---

// Enable CORS for your frontend application
// In production, replace '*' with your frontend domain for better security (e.g., 'https://www.kenyavetsmission.org')
app.use(cors()); 
// Middleware to parse incoming JSON request bodies
app.use(express.json());

// --- Nodemailer Transporter Setup ---

// Configure Nodemailer using environment variables for secure SMTP access
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT), // Port 465 or 587
    secure: process.env.SMTP_SECURE === 'true', // true for 465 (SSL/TLS), false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

// --- API Route Handler: POST /api/contact ---

app.post('/api/contact', async (req, res) => {
    // Destructure data sent from your React frontend form
    const { name, email, interest, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Missing required fields (Name, Email, Message).' });
    }

    // Construct the email options
    const mailOptions = {
        // Uses the configured account to send the email
        from: process.env.EMAIL_FROM, 
        // The address that receives the contact form submission
        to: process.env.EMAIL_TO,     
        // Subject line uses the selected interest
        subject: `New Inquiry: ${interest || 'General Information'} from ${name}`, 
        // Set reply-to to the sender's email so you can hit 'Reply' directly
        replyTo: email, 
        text: `
Name: ${name}
Email: ${email}
Interest: ${interest || 'N/A'}

Message:
${message}
        `,
    };

    try {
        // Send the email using the SMTP configuration
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);

        // Respond to the frontend with success status
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        
        // Respond to the frontend with an error status
        res.status(500).json({ 
            success: false, 
            message: 'Server failed to send the message. Check server logs for details.' 
        });
    }
});

// --- Server Startup ---

app.listen(PORT, () => {
    // Debugging information to confirm working directory
    console.log(`Current Working Directory: ${process.cwd()}`);
    console.log(`Node.js Mail Server running on port ${PORT} in ${process.env.NODE_ENV} mode.`);
    console.log(`Ready to receive POST requests at http://localhost:${PORT}/api/contact`);
});