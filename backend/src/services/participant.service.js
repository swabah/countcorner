const campaignModel = require("../models/campaign.model");
const participantModel = require("../models/participant.model");

function normalizeString(str) {
  return str.replace(/\s+/g, " ").trim().toLowerCase();
}

async function isNameUnique(name, campaignId) {
  const normalizedName = normalizeString(name);
  const existing = await participantModel.findOne({
    normalizedName,
    campaignId,
  });
  return !existing;
}

const getAllParticipants = async () => {
  const participates = await participantModel.find().populate("campaignId");
  return participates;
};
const getParticipantById = async (id) => {
  const data = await participantModel.findById(id);
  return data;
};
const createParticipant = async (data) => {
  const unique = await isNameUnique(data.name, data.campaignId);
  if (!unique) {
    throw new Error(
      "Participant name must be unique per campaign (case and space insensitive)"
    );
  }

  const normalizedName = normalizeString(data.name);

  const participantData = {
    ...data,
    normalizedName,
  };

  const participate = await participantModel.create(participantData);

  await campaignModel.findByIdAndUpdate(
    data.campaignId,
    { $push: { participates: participate.id } },
    { new: true }
  );

  return participate;
};
const updateParticipant = async (id, data) => {
  const newData = await participantModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return newData;
};
const deleteParticipant = (id) => participantModel.delete(id);

const getLeaderboard = () =>
  participantModel.find().sort({ points: -1 }).limit(10);

module.exports = {
  participantService: {
    createParticipant,
    getAllParticipants,
    getParticipantById,
    updateParticipant,
    createParticipant,
    deleteParticipant,
    getLeaderboard,
  },
};
