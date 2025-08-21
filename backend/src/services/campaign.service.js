const Campaign = require("../models/campaign.model");
const Participant = require("../models/participant.model");

const getAllCampaigns = () => {
  return Campaign.find().populate({
    path: "participants",
  });
};

const getCampaignById = (id) => {
  const data = Campaign.findById(id).populate({
    path: "participants",
  });
  return data;
};

const createCampaign = async (data) => {
  const newCampaign = await Campaign.create(data);
  return newCampaign;
};

const updateCampaign = async (id, data) => {
  const newData = await Campaign.findByIdAndUpdate(id, data, {
    new: true,
  });
  return newData;
};

const deleteCampaign = async (id) => {
  await Campaign.findByIdAndDelete(id);
  await Participant.deleteMany({ lesson: lessonId });
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
