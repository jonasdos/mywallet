import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import authRouter from './routers/user-router'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
const mongoClient = new MongoClient(process.env.DATABASE_URL)
const db = mongoClient.db()
const porta = process.env.PORT

try {
  await mongoClient.connect()
  console.log("Conexão com banco de dados concluída")

}
catch (error) {
  console.log('falha na conexão com o banco de dados', error.message)
}
app.use(authRouter)
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`)
})

export default db