const Campaign = require("../models/campaign.model");
const Participant = require("../models/participant.model");
const Contribution = require("../models/contribution.model");

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
  const participants = await Participant.find().populate({
    path: "contributions",
  });
  return participants;
};
const getParticipantById = async (id) => {
  const data = await Participant.findById(id);
  return data;
};
const createParticipant = async (data) => {
  const unique = await isNameUnique(
    normalizeString(data.name),
    data.campaignId
  );
  if (!unique) {
    throw new Error(
      "Participant name must be unique per campaign (case and space insensitive)"
    );
  }

  const participant = await Participant.create(data);

  await Campaign.findByIdAndUpdate(
    data.campaignId,
    { $push: { participants: participant.id } },
    { new: true }
  );

  return participant;
};
const updateParticipant = async (id, updateData) => {
  console.log(updateData);
  if (updateData.contributions) {
    const contributionDocs = updateData.contributions.map((contribution) => ({
      ...contribution,
      participantId: id,
    }));
    const updatedContribution = await Contribution.create(contributionDocs);

    updateData.contributions = updatedContribution.map((c) => c._id);
  }

  console.log("updateDContribution:", updateData.contributions);

  const updatedParticipant = await Participant.findByIdAndUpdate(
    id,
    {
      $push: { contributions: { $each: updateData.contributions } },
    },
    {
      new: true,
      runValidators: true,
    }
  ).populate("contributions");

  updatedParticipant.totalContributed = updateData.totalContributed;
  await updatedParticipant.save();

  console.log("updatedParticipant:", updatedParticipant);

  return updatedParticipant;
};

const deleteParticipant = async (id) => {
  const participant = await Participant.findById(id);

  await Campaign.findByIdAndUpdate(participant.campaignId, {
    $pull: { participants: id },
  });

  await participant.deleteOne();
  return participant;
};

const getLeaderboard = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const participants = await Participant.find()
    .populate({
      path: "contributions",
      select: "date count",
    })
    .sort({ totalContributed: -1 });

  // Calculate today's count for each participant
  const participantsWithTodayCount = participants.map((participant) => {
    const todayContributions = participant.contributions.filter(
      (contribution) => {
        const contributionDate = new Date(contribution.date);
        contributionDate.setHours(0, 0, 0, 0);
        return contributionDate.getTime() === today.getTime();
      }
    );

    const countToday = todayContributions.reduce((sum, contribution) => {
      return sum + (Number(contribution.count) || 0);
    }, 0);

    return {
      ...participant.toObject(),
      countToday,
    };
  });

  return participantsWithTodayCount;
};

module.exports = {
  participantService: {
    createParticipant,
    getAllParticipants,
    getParticipantById,
    updateParticipant,
    deleteParticipant,
    getLeaderboard,
  },
};
