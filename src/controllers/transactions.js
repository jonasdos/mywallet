import { transactionSchema } from "../schemas/transactionSchema.js";
import db from '../db/conection.js'

export async function transaction(req, res) {
  const requestData = req.body
  const validaData = transactionSchema.validate(requestData, { abortEarly: false })
  if (validaData.error) {
    const erros = validaData.error.details.map(detail => detail.message)
    return res.status(422).send(erros)
  }
  console.log(`Validação concluída - Proximo passo: salvar dados`)
  try {
    await db.collection('transactions').insertOne({
      ...requestData,
      userID: res.locals.user._id,
      data: new Date()
    })
    return res.status(200).send('Transação concluída com sucesso')
  }
  catch (error) {
    console.log("Erro ao salvar transação", error)
    res.status(400).send("Erro ao salvar transação")
  }


}