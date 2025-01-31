import { Resend } from 'resend';
import Cors from 'cors';

require('dotenv').config(); // Load .env file
const resend = new Resend(process.env.RESEND_API_KEY);

console.log(resend);        

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'HEAD'],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  // Ensure it's a POST request
  if (req.method === 'POST') {
    const { email, data } = req.body;

    if (!email || !data) {
      return res.status(400).json({ error: "Missing email or report data" });
    }

    try {
      // Send email using Resend service
      await resend.emails.send({
        from: "khushbub.adexlabs@gmail.com", // Use verified sender email
        to: email,
        subject: "Your Page Speed Report",
        text: `Your report: https://test-two-tau-58.vercel.app/${data.reportUrl}`,
      });

      // Send success response
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: `Failed to send email: ${error.message}` });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
