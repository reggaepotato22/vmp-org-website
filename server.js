import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - order matters!
app.use(cors());
app.use(express.json());

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== API Routes (MUST come before static files) =====
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, interest, message } = req.body;

    console.log('Received contact form:', { name, email, interest });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD, // Changed from SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify connection
    await transporter.verify();
    console.log('SMTP connection verified');

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: process.env.EMAIL_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `New Contact Form: ${interest || 'General Inquiry'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Interest:</strong> ${interest || 'Not specified'}</p>
        <hr>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `From: ${name} (${email})\nInterest: ${interest}\n\nMessage:\n${message}`,
    });

    console.log('Email sent successfully');
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send message",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "Server is running",
    smtp: {
      host: process.env.SMTP_HOST,
      user: process.env.SMTP_USER
    }
  });
});

// ===== Serve React build (only for production) =====
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "dist")));

  // Catch-all route - use proper regex instead of *
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📧 SMTP Host: ${process.env.SMTP_HOST}`);
  console.log(`🔐 SMTP User: ${process.env.SMTP_USER}`);
});