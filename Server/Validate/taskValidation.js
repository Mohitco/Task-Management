const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().min(5).required().messages({
    "string.base": "title must be a string",
    "string.empty": "title is required",
    "string.min": "title must be at least 5 characters long",
    "any.required": "title field is required",
  }),

  description: Joi.string().min(5).required().messages({
    "string.base": "description must be a string",
    "string.empty": "description is required",
    "any.required": "description field is required",
  }),
  priority: Joi.string().valid("low", "medium", "high").required(),
  status: Joi.string().valid("yetToStart", "InProgress", "completed").required(),
});

module.exports = taskSchema;
