const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY || 're_gH781jHp_NUHcRxYHf6C1fcuiwDRBBFGH');



app.post("/send-email", async (req, res) => {
  const { email, data } = req.body;

  if (!email || !data) {
    return res.status(400).json({ error: "Missing email or report data" });
  }

  const { url, pageWeight, co2ePerVisit, reportUrl } = data;

  try {
    await resend.emails.send({
      from: "khushbub.adexlabs@gmail.com", // You can change this to your verified domain email
      to: email,
      subject: "Your Page Speed Report",
      text: `
        Here is your Page Speed Report:

        URL: ${url}
        Page Weight: ${pageWeight}
        CO2e per Visit: ${co2ePerVisit}

        View your full report here: https://test-two-tau-58.vercel.app${reportUrl}

        Thank you for using our service!
      `,
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: `Failed to send email: ${error.message}` });
  }
});

module.exports = app;
