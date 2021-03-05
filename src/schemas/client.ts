
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
    .valid('Identification card', 'Passport')
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

  date_birtday: Joi.date(),

  gender: Joi.string()
    .valid('Male', 'Female')
    .required(),

  civil_status: Joi.string()
    .valid('Married','Single','Divorced')
    .required(),

  password:
    Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .min(8)
      .required(),

})

export const dataFilter = Joi.object({

  name: Joi.string(),

  last_name: Joi.string(),

  type_document: Joi.string()
  .valid('Identification card', 'Passport'),

  number_document: Joi.string(),
  
  email: Joi.string()
    .email()
})