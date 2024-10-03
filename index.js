import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './src/routers/user-router.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(authRouter)
const porta = process.env.PORT
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`)
})

