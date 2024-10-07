import { Router } from "express"
import { signUp } from "../controllers/sign-up.js"
import { signIn } from "../controllers/sign-in.js"

const authRouter = Router()

authRouter.post("/sign-up", signUp)
authRouter.post("/sign-in", signIn)

export default authRouter
