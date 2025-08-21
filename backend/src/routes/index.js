const express = require("express");
const router = express.Router();

const campaignRoutes = require("./campaign.route");
const participantRoutes = require("./participant.route");

const defaultRoutes = [
  {
    path: "/campaigns",
    route: campaignRoutes,
  },
  {
    path: "/participants",
    route: participantRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
