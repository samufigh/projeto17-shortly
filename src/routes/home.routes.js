import { Router } from "express"
import { deleteURL, shorten, myURLS } from "../controllers/home.controllers.js"
import { validadeSchema } from "../middlewares/validateSchema.js"
import { schemaUrl } from "../schemas/url.schemas.js"

const homeRouter = Router()

//faz o encurtamento
homeRouter.post("/urls/shorten", validadeSchema(schemaUrl), shorten)

//apaga a url
homeRouter.delete("/urls/:id", deleteURL)

//exibe os links encurtados pelo usuário
homeRouter.get("/users/me", myURLS)

export default homeRouter