const express = require("express");
const router = express.Router();

const campaignRoutes = require("../src/routes/campaign.route");
const participantRoutes = require("../src/routes/participant.route");

router.get("/", (req, res) => {
  res.send("Hello! Express on Vercel.");
});

// Routes
router.use("/campaigns", campaignRoutes);
router.use("/participants", participantRoutes);

module.exports = router;
