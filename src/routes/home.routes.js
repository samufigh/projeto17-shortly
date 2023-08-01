import { Router } from "express"
import { deleteURL, shorten, myURLS } from "../controllers/home.controllers.js"

const homeRouter = Router()

//faz o encurtamento
homeRouter.post("/urls/shorten", shorten)

//apaga a url
homeRouter.delete("/urls/:id", deleteURL)

//exibe os links encurtados pelo usuário
homeRouter.get("/users/me", myURLS)

export default homeRouter