const express = require('express');
const sendEmail = require('./emailService'); // Import the email service
const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { email, carbonData } = req.body;

  try {
    const response = await sendEmail(email, carbonData);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
