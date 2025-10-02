// server/server.js
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// POST endpoint for contact form
app.post("/api/contact", async (req, res) => {
  const { name, email, interest, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      host: "mail.kenyavetsmission.org", // e.g. smtp.gmail.com or your webmail SMTP
      port: 465,
      secure: true,
      auth: {
        user: "ultivet@gmail.com",
        pass: "", // best put in .env
      },
    });

    await transporter.sendMail({
      from: `"kenyavet " <info@kenyavetsmission.org>`,
      to: "info@kenyavetsmission.org", // where to receive
      subject: `New Inquiry from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Interest: ${interest}
        Message: ${message}
      `,
    });

    res.json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Email failed" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
