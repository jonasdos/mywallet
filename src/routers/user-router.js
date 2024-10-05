import { Router } from "express"
import { signUp } from "../controllers/sign-up.js"
import { signIn } from "../controllers/sign-in.js"
import { validaSession } from "../middlewares/auth-user.js"
import { transactions } from "../controllers/transactions.js"
import { showTransactions } from "../controllers/showTransactions.js"
import { editTransaction } from "../controllers/edit.js"
import { deleteTransaction } from "../controllers/delete.js"
const authRouter = Router()

authRouter.post("/sign-up", signUp)
authRouter.post("/sign-in", signIn)
authRouter.post("/transactions", validaSession, transactions)
authRouter.get("/transactions", validaSession, showTransactions)
authRouter.put("/transactions", validaSession, editTransaction)
authRouter.delete("/transactions", validaSession, deleteTransaction)
export default authRouter
