import { Router } from "express"
import { login, register } from "../controllers/user.controllers.js"
import { validadeSchema } from "../middlewares/validateSchema.js"
import { schemaSignin, schemaSignup } from "../schemas/user.schemas.js"

const userRouter = Router()

//faz o cadastro
userRouter.post("/signup",validadeSchema(schemaSignup), register)

//faz o login
userRouter.post("/signin", validadeSchema(schemaSignin), login)

export default userRouter