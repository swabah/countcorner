const express = require("express");
const router = express.Router();
const {
  participantController,
} = require("../controllers/participant.controller");
const validate = require("../middleware/validate");
const {
  participantValidation,
} = require("../validations/participant.validation");

router.post(
  "/",
  validate(participantValidation.createParticipant),
  participantController.createparticipant
);
router.put(
  "/:id",
  validate(participantValidation.updateParticipant),
  participantController.updateparticipant
);

router.get("/", participantController.getAllparticipant);
router.get("/leaderboard", participantController.leaderboard);
router.get("/:id", participantController.getparticipantById);

router.delete("/:id", participantController.deleteparticipant);

module.exports = router;
