import Joi from 'joi';

export const schema = Joi.object().keys({
  id: Joi.string().required(),
  user_id: Joi.string().required(),
  type: Joi.string().allow(null),
  value: Joi.string().allow(null),
});
