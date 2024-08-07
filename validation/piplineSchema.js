import Joi from "joi";

export const pipelineSchema = Joi.object({
  name: Joi.string().required().min(3).max(255),
  sourceId: Joi.required(),
  destinationId: Joi.required(),
});
