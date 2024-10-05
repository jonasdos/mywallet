import joi from "joi"

export const SignUpSchema = joi.object({
  email: joi.string().email().required(),
  senha: joi.string().required().min(6),
  userName: joi.string().required().min(2),
})

export const SignInSchema = joi.object({
  email: joi.string().email().required(),
  senha: joi.string().required()
})

export const transactionsSchema = joi.object({
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