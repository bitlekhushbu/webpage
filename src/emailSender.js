const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(cors({ origin: 'https://test-two-tau-58.vercel.app' })); // Allow frontend
app.use(express.json()); // Middleware for JSON parsing

app.get('/', (req, res) => {
  res.send('Server is running on Vercel!');
});

app.post('/send-email', async (req, res) => {
  const { email, data } = req.body;

  if (!email || !data) {
    return res.status(400).json({ error: 'Missing email or report data' });
  }

  const { url, pageWeight, co2ePerVisit, reportUrl } = data;

  const emailText = `
    Here is your Page Speed Report:

    URL: ${url}
    Page Weight: ${pageWeight}
    CO2e per Visit: ${co2ePerVisit}
    
    View your full report here: https://test-two-tau-58.vercel.app${reportUrl}

    Thank you for using our service!
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      debug: true, // Enable debugging
    });
    

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Page Speed Report',
      text: emailText,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

module.exports = app; // Vercel requires this
