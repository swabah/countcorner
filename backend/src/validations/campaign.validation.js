const Joi = require("joi");

const createCampaign = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  goal: Joi.number().required(),
  isActive: Joi.boolean().required(),
});

const updateCampaign = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  goal: Joi.number().optional(),
  isActive: Joi.boolean().optional(),
});

module.exports = {
  createCampaign,
  updateCampaign,
};
