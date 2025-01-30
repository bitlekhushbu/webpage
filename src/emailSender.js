const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASSWORD
  }
});


const sendEmail = async (email, data) => {
  try {
    const emailText = `
      Here is your Page Speed Report:

      URL: ${data.url}
      Page Weight: ${data.pageWeight}
      CO2e per Visit: ${data.co2ePerVisit}
      
      View your full report here: https://test-two-tau-58.vercel.app${data.reportUrl}

      Thank you for using our service!
    `;

    const mailOptions = {
      from: 'sandbox365d9615831b474e9157e5d27ba46222.mailgun.org', // Use the email from your Mailgun domain
      to: email,
      subject: 'Your Page Speed Report',
      text: emailText
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
