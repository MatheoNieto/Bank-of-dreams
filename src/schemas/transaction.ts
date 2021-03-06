
import Joi from 'joi'

export const createSchema = Joi.object({

  type_trasaction: Joi.string()
    .valid('Shoping', 'Consignment')
    .required(),

  detail_trasaction: Joi.string()
    .required(),

  valor: Joi.number()
    .required()

})

export const reportSchema = Joi.object({
  date_start: Joi.date()
    .required(),

  date_end: Joi.date()
    .required(),
})


