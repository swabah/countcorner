const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { campaignController } = require("../controllers/campaign.controller");
const { campaignValidation } = require("../validations/campaign.validation");

// Routes
router.get("/", campaignController.getAllCampaigns);
router.get("/:id", campaignController.getCampaignById);

router.post(
  "/",
  validate(campaignValidation.createCampaign),
  campaignController.createCampaign
);
router.put(
  "/:id",
  validate(campaignValidation.updateCampaign),
  campaignController.updateCampaign
);
router.delete("/:id", campaignController.deleteCampaign);

module.exports = router;
