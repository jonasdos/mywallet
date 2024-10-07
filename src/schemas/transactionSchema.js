import joi from "joi"

export const transactionSchema = joi.object({
  value: joi.number().positive().required(),
  description: joi.string().required().min(3),
  type: joi.string().valid('deposit', 'withdraw').required()
})

export const editTransactionSchema = joi.object({
  value: joi.number().positive().required(),
  description: joi.string().required().min(3),
  type: joi.string().valid('deposit', 'withdraw').required(),
  transactionID: joi.string().required()
})
export const deleteTransactionSchema = joi.object({
  transactionID: joi.string().required()
})