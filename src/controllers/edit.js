
import db from "../db/conection.js";
import { editTransactionSchema } from "../schemas/schemas.js";
import { ObjectId } from "mongodb";

export async function editTransaction(req, res) {
  const requestData = req.body
  const validaData = editTransactionSchema.validate(requestData, { abortEarly: false })
  if (validaData.error) {
    const erros = validaData.error.details.map(detail => detail.message)
    return res.status(422).send(erros)
  }
  const transaction = await db.collection('transactions').findOne({
    _id: new ObjectId(requestData.transactionID),
    userID: new ObjectId(res.locals.user._id)
  })
  console.log(`${requestData.transactionID}, ${res.locals.user._id}`)
  if (!transaction) { return res.status(401).send('Erro na solicitação') }
  try {
    await db.collection('transactions').updateOne(
      { _id: new ObjectId(requestData.transactionID) },
      { $set: { value: requestData.value, description: requestData.description } }
    )
    const editado = await db.collection('transactions').findOne(
      { _id: new ObjectId(requestData.transactionID) }
    )
    console.log(editado)
    return res.status(204).send(editado)

  }
  catch (error) {
    console.error('Erro ao editar transação:', error)
    res.status(400).send('Erro ao editar transação')
  }
}