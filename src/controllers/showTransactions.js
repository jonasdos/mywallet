import db from '../db/conection.js'

export async function showTransactions(req, res) {
  const usuario = res.locals.user._id
  const { page = 1 } = req.query
  const limit = 10
  const pagina = parseInt(page, 10)

  if (isNaN(pagina) || pagina <= 0) {
    return res.status(400).send("O número da página deve ser um valor positivo.")
  }

  console.log(`id do usuário: ${usuario}`)
  try {
    const skip = (pagina - 1) * limit
    const transa = await db.collection('transactions')
      .find({ userID: usuario })
      .sort({ data: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()
    const resultados = transa.length
    console.log(resultados)
    return res.status(200).send(transa)
  }
  catch (error) {
    res.status(400).send("Erro ao buscar dados")
  }
}