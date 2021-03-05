
import Joi from 'joi'

export const solicitudeSchema = Joi.object({

  type_product: Joi.string()
  .valid('Agil Credit', 'Credit Card', 'Account Saving', 'Lessing House')
  .required(),

})

export const changeStateSolictudSchema = Joi.object({

  state_petition: Joi.string()
  .valid('Pending','Accepted','Reject' )
  .required(),

})

