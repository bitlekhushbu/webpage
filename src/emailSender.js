import { Resend } from 'resend';
import cors from 'cors';

require('dotenv').config(); // Load .env file
console.log("Resend API Key:", process.env.RESEND_API_KEY); // Debugging

const resend = new Resend(process.env.RESEND_API_KEY);

// The handler function for the Vercel serverless API route
export default async function handler(req, res) {
  // CORS setup
  await cors(req, res);

  // Only handle POST requests
  if (req.method === 'POST') {
    const { email, data } = req.body;

    if (!email || !data) {
      return res.status(400).json({ error: "Missing email or report data" });
    }

    try {
      // Send the email using Resend
      await resend.emails.send({
        from: "khushbub.adexlabs@gmail.com", // Replace with verified email
        to: email,
        subject: "Your Page Speed Report",
        text: `Your report: https://test-two-tau-58.vercel.app/${data.reportUrl}`,
      });

      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: `Failed to send email: ${error.message}` });
    }
  } else {
    // If the method is not POST, return 405 (Method Not Allowed)
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
