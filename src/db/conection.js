import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
dotenv.config()
const mongoClient = new MongoClient(process.env.DATABASE_URL)
const db = mongoClient.db()
try {
  await mongoClient.connect()
  console.log("Conexão com banco de dados concluída")

}
catch (error) {
  console.log('falha na conexão com o banco de dados', error.message)
}
export default db