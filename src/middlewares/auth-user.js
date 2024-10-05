import jwt from 'jsonwebtoken'
import db from '../db/conection.js'
import dotenv from 'dotenv'
dotenv.config()


export async function validaSession(req, res, next) {
  const { authorization } = req.headers
  const token = authorization?.replace('Bearer ', '').trim()
  if (!token) return res.status(401).send('Não há token')

  try {
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
      if (error) return res.status(401).send(error)

      const sessao = await db.collection('sessions').findOne({ token: token })
      console.log(`Sessão encontrada: ${sessao.user}`)
      if (!sessao) return res.sendStatus(401).send('Sessão não encontrada')

      const user = await db.collection('users').findOne({
        _id: sessao.userID
      })
      console.log(`User encontrado: ${user.userName}`)
      if (!user) return res.sendStatus(401).send('Usuário não encontrado')
      res.locals.user = user
      res.locals.token = token
      return next()
    })

  }
  catch (error) {
    return res.status(400).send(error)
  }
}
