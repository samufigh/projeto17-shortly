import { Router } from "express"
import { deleteURL, shorten, myURLS } from "../controllers/home.controllers.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { schemaUrl } from "../schemas/url.schemas.js"
import { validateAuth } from "../middlewares/validateAuth.js"

const homeRouter = Router()

//faz o encurtamento
homeRouter.post("/urls/shorten",validateAuth, validateSchema(schemaUrl), shorten)

//apaga a url
homeRouter.delete("/urls/:id", validateAuth, deleteURL)

//exibe os links encurtados pelo usuário
homeRouter.get("/users/me",validateAuth, myURLS)

export default homeRouter