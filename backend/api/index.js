const express = require("express");
const app = express();

const campaignRoutes = require("../src/routes/campaign.route");
const participantRoutes = require("../src/routes/participant.route");

app.get("/", (req, res) => {
  res.send("Hello! Express on Vercel.");
});

// Routes
app.use("/campaigns", campaignRoutes);
app.use("/participants", participantRoutes);

module.exports = app;
