const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define the root route
app.get('/', (req, res) => {
  res.send('Welcome to the Email Sender API!');
});

// Endpoint to send email
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or your email service
      auth: {
        user: 'khushbub.adexlabs@gmail.com', // Replace with your email
        pass: 'llhq hsdl ulfa yuxc', // Replace with your email password
      },
    });

    const mailOptions = {
      from: 'khushbub.adexlabs@gmail.com',
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
