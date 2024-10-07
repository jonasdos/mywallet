import { Router } from "express"
import { validaSession } from "../middlewares/auth-user.js"
import { transaction } from "../controllers/transactions.js"
import { showTransactions } from "../controllers/showTransactions.js"
import { editTransaction } from "../controllers/edit.js"
import { deleteTransaction } from "../controllers/delete.js"

const transactionRouther = Router()

transactionRouther.post("/transaction", validaSession, transaction) //ok
transactionRouther.get("/transactions", validaSession, showTransactions) //
transactionRouther.put("/transaction", validaSession, editTransaction)
transactionRouther.delete("/transaction", validaSession, deleteTransaction)

export default transactionRouther