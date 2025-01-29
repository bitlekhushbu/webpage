const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors({ origin: 'https://test-two-tau-58.vercel.app' })); // Allow requests from your deployed frontend
app.use(express.json()); // Middleware to parse JSON

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
    
    View your full report here: https://your-frontend.vercel.app${reportUrl}

    Thank you for using our service!
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use environment variables in Vercel
      },
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

module.exports = app; // Vercel requires this instead of app.listen()
