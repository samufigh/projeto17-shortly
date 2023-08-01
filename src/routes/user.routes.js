import { Router } from "express"
import { login, register } from "../controllers/user.controllers.js"

const userRouter = Router()

//faz o cadastro
userRouter.post("/signup", register)

//faz o login
userRouter.post("/signin", login)

export default userRouter