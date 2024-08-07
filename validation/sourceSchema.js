import Joi from "joi";

export const sourceSchema = Joi.object({
  name: Joi.string().required().min(3).max(255),
  description: Joi.string().required().min(5).max(500),
});
