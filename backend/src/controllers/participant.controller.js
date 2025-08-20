const { participantService } = require("../services/participant.service");
const catchAsync = require("../utils/catchAsync");

const getAllparticipant = catchAsync(async (req, res) => {
  const participants = await participantService.getAllParticipants();
  res.send(participants);
});

const getparticipantById = catchAsync(async (req, res) => {
  const participant = await participantService.getParticipantById(
    req.params.id
  );
  if (!participant) return res.status(404).json({ message: "Not found" });
  res.send(participant);
});

const createparticipant = catchAsync(async (req, res) => {
  const participant = await participantService.createParticipant(req.body);
  res.status(201).send(participant);
});

const updateparticipant = catchAsync(async (req, res) => {
  const updated = await participantService.updateParticipant(
    req.params.id,
    req.body
  );
  if (!updated) return res.status(404).json({ message: "Not found" });
  res.json(updated);
});

const deleteparticipant = catchAsync(async (req, res) => {
  const deleted = await participantService.deleteParticipant(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
});

const leaderboard = catchAsync(async (req, res) => {
  const leaders = await participantService.getLeaderboard();
  res.json(leaders);
});

module.exports = {
  participantController: {
    createparticipant,
    getAllparticipant,
    getparticipantById,
    updateparticipant,
    deleteparticipant,
    leaderboard,
  },
};
