import * as Joi from 'joi'

// obliga a que estas variables de entorno esten configuradas
export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.required(),
  PORT: Joi.number().default(3005),
  DEFAULT_LIMIT: Joi.number().default(6),
})
