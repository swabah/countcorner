const joi = require("joi");

const createParticipant = joi.object({
  name: joi.string().required(),
  campaignId: joi.string().required(),
  countTotal: joi.number().optional(),
});

const updateParticipant = joi.object({
  name: joi.string().optional(),
  campaignId: joi.string().optional(),
  countTotal: joi.number().optional(),
  date: joi.date(),
});

module.exports = {
  participantValidation: {
    createParticipant,
    updateParticipant,
  },
};
