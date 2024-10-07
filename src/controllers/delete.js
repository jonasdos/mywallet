import db from "../db/conection.js";
import { deleteTransactionSchema } from "../schemas/transactionSchema.js";
import { ObjectId } from "mongodb";

export async function deleteTransaction(req, res) {
  const requestData = req.body
  const validaData = deleteTransactionSchema.validate(requestData, { abortEarly: false })
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
    await db.collection('transactions').deleteOne(
      { _id: new ObjectId(requestData.transactionID) }
    )

    return res.status(204).send("Transação deletada com sucesso")

  }
  catch (error) {
    console.error('Erro ao editar transação:', error)
    res.status(400).send('Erro ao editar transação')
  }
}