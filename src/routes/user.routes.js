import { Router } from "express"
import { login, register } from "../controllers/user.controllers.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { schemaSignin, schemaSignup } from "../schemas/user.schemas.js"

const userRouter = Router()

//faz o cadastro
userRouter.post("/signup",validateSchema(schemaSignup), register)

//faz o login
userRouter.post("/signin", validateSchema(schemaSignin), login)

export default userRouter