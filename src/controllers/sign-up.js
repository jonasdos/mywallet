import bcrypt from "bcrypt"
import db from '../db/conection.js'
import { SignUpSchema } from "../schemas/schemas.js"

export async function signUp(req, res) {
  const user = req.body
  const dadosValidos = SignUpSchema.validate(user, { abortEarly: false })
  if (dadosValidos.error) {
    const erros = dadosValidos.error.details.map((detail) => detail.message)
    return res.status(422).send(erros)
  }
  try {
    const usuariodb = await db.collection('users').findOne({
      $or: [
        { userName: user.userName },
        { email: user.email }
      ]
    })
    if (usuariodb) {
      return res.status(409).send('Nome de usuário ou e-mail indisponível')
    }
    await db.collection('users').insertOne({
      ...user,
      senha: bcrypt.hashSync(user.senha, 10)
    })
    const users = await db.collection('users').find().toArray()
    res.send(users)
  }
  catch (error) {
    res.status(500).send('Erro ao cadastrar usuário')
    console.log(error)
  }
}