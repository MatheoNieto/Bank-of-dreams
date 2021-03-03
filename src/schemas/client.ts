
import Joi from 'joi'

export const createSchema = Joi.object({

  name: Joi.string()
    .min(3)
    .max(50)
    .required(),

  last_name: Joi.string()
    .min(3)
    .max(50)
    .required(),

  type_document: Joi.string()
    .required(),

  number_document: Joi.string()
    .required(),

  phone: Joi.string()
    .max(15)
    .required(),

  telephone: Joi.string()
    .required()
    .max(10),

  email: Joi.string()
    .email()
    .required(),

  date_birtday: Joi.date()
    .required(),

  gender: Joi.string()
    .required(),

  civil_status: Joi.string()
    .required(),

})

export const dataFilter = Joi.object({

  name: Joi.string(),
  last_name: Joi.string(),
  type_document: Joi.string(),
  number_document: Joi.string(),
  email: Joi.string()
    .email()
})