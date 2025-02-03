import { Resend } from 'resend';

require('dotenv').config(); // Load .env file locally

// Debugging: Check if API key is loaded
console.log("Resend API Key:", process.env.RESEND_API_KEY ? "Loaded" : "Not Loaded");

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);  

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, data } = req.body;

  if (!email || !data) {
    return res.status(400).json({ error: "Missing email or report data" });
  }

  try {
    console.log("Sending email to:", email);

    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // ✅ Use this for testing if your domain is not verified
      to: email,
      subject: "Your Page Speed Report",
      text: `Your report: https://test-two-tau-58.vercel.app/${data.reportUrl}`,
    });

    console.log("Email sent successfully:", response);

    return res.status(200).json({ message: "Email sent successfully!", response });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: `Failed to send email: ${error.message}` });
  }
}
