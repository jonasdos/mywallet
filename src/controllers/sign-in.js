import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import db from '../db/conection.js'
import { ObjectId } from "mongodb"
import { SignInSchema } from "../schemas/schemas.js"


export async function signIn(req, res) {
  const userRequest = req.body
  const dadosValidos = SignInSchema.validate(userRequest, { abortEarly: false })
  if (dadosValidos.error) {
    const erros = dadosValidos.error.details.map((detail) => detail.message)
    return res.status(422).send(erros)
  }
  try {
    const user = await db.collection('users').findOne({ email: userRequest.email })
    if (!user) { return res.status(404).send('Usuário não encontrado') }

    const senhaValida = bcrypt.compareSync(userRequest.senha, user.senha)
    if (!senhaValida) { return res.status(401).send('Senha incorreta') }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

    await db.collection('sessions').insertOne({
      user: user.userName,
      token: token,
      data: new Date()
    })
    return res.status(200).send(token)
  }


  catch (error) {
    return res.send(error)
  }
}