const express = require('express');
const bodyParser = require('body-parser');
const emailRoutes = require('./emailRoutes'); // Import the email routes

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/api', emailRoutes); // Use the email routes under the /api prefix

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
