const Campaign = require("../models/campaign.model");
const Participant = require("../models/participant.model");

function normalizeString(str) {
  return str.replace(/\s+/g, " ").trim().toLowerCase();
}

async function isNameUnique(name, campaignId) {
  const normalizedName = normalizeString(name);
  const existing = await Participant.findOne({
    normalizedName,
    campaignId,
  });
  return !existing;
}

const getAllParticipants = async () => {
  const participants = await Participant.find();
  return participants;
};
const getParticipantById = async (id) => {
  const data = await Participant.findById(id);
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
    name: normalizedName,
  };

  const participant = await Participant.create(participantData);

  await Campaign.findByIdAndUpdate(
    data.campaignId,
    { $push: { participants: participant.id } },
    { new: true }
  );

  return participant;
};
const updateParticipant = async (id, data) => {
  const newData = await Participant.findByIdAndUpdate(id, data, {
    new: true,
  });
  return newData;
};

const deleteParticipant = async (id) => {
  const participant = await Participant.findById(id);

  await Campaign.findByIdAndUpdate(participant.campaignId, {
    $pull: { participants: id },
  });

  await participant.deleteOne();
  return participant;
};

const getLeaderboard = () => Participant.find().sort({ points: -1 }).limit(10);

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
