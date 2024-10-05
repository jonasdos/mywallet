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
