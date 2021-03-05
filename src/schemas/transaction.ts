
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



