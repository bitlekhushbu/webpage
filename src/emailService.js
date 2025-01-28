const nodemailer = require('nodemailer');

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Or another email provider
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-email-password', // Replace with your email password or app password
  },
});

// Function to send an email
const sendEmail = async (email, carbonData) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your Carbon Footprint Report',
    html: `
      <h1>Your Carbon Footprint Report</h1>
      <p><strong>Page Weight:</strong> ${carbonData.pageWeight}</p>
      <p><strong>CO2e per New Visit:</strong> ${carbonData.co2ePerVisit}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
