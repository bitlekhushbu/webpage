
require("dotenv").config(); // Load .env file
console.log("Resend API Key:", process.env.RESEND_API_KEY); // Debugging

const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config(); 

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);



// ✅ Default route to check if the server is running
app.get("/", (req, res) => {
  res.send("Server is running!");
}); 

app.post("/send-email", async (req, res) => {
  console.log("Received POST request to /send-email"); // Debugging log
  const { email, data } = req.body;

  if (!email || !data) {
    return res.status(400).json({ error: "Missing email or report data" });
  }

  try {
    await resend.emails.send({
      from: "khushbub.adexlabs@gmail.com",
      to: email,
      subject: "Your Page Speed Report",
      text: `Your report: https://test-two-tau-58.vercel.app/${data.reportUrl}`,
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: `Failed to send email: ${error.message}` });
  }
});

// ✅ Ensure the server listens on port 3000
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
