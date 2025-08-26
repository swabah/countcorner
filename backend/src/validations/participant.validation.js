const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createParticipant = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    campaignId: Joi.string().custom(objectId).required(),
  }),
};

const updateParticipant = {
  body: Joi.object().keys({
    name: Joi.string().optional(),
    campaignId: Joi.string().custom(objectId).optional(),
    totalContributed: Joi.number().min(0).optional(),
    contributions: Joi.array()
      .items(
        Joi.object().keys({
          count: Joi.number().min(0).optional(),
          date: Joi.date().optional(),
        })
      )
      .optional(),
  }),
};

module.exports = {
  createParticipant,
  updateParticipant,
};
