const campaignModel = require("../models/campaign.model");

const getAllCampaigns = () => {
  return campaignModel.find().populate({
    path: "participates",
  });
};

const getCampaignById = (id) => {
  const data = campaignModel.findById(id).populate({
    path: "participates",
  });
  return data;
};

const createCampaign = async (data) => {
  const newCampaign = await campaignModel.create(data);
  return newCampaign;
};

const updateCampaign = async (id, data) => {
  const newData = await campaignModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return newData;
};

const deleteCampaign = (id) => {
  return campaignModel.findByIdAndDelete(id);
};

module.exports = {
  campaignService: {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign,
  },
};
