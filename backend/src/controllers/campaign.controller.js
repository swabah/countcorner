const catchAsync = require("../utils/catchAsync");
const { campaignService } = require("../services/campaign.service");

const getAllCampaigns = catchAsync(async (req, res) => {
  const campaigns = await campaignService.getAllCampaigns();
  res.json(campaigns);
});

const getCampaignById = catchAsync(async (req, res) => {
  const campaign = await campaignService.getCampaignById(req.params.id);
  if (!campaign) return res.status(404).json({ message: "Campaign not found" });
  res.send(campaign);
});

const createCampaign = catchAsync(async (req, res) => {
  const newCampaign = await campaignService.createCampaign(req.body);
  res.status(200).json(newCampaign);
});

const updateCampaign = catchAsync(async (req, res) => {
  const updatedCampaign = await campaignService.updateCampaign(
    req.params.id,
    req.body
  );
  if (!updatedCampaign)
    return res.status(404).json({ message: "Campaign not found" });
  res.send(updatedCampaign);
});

const deleteCampaign = catchAsync(async (req, res) => {
  const deleted = await campaignService.deleteCampaign(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Campaign not found" });
  res.json({ message: "Campaign deleted successfully" });
});

module.exports = {
  campaignController: {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign,
  },
};
