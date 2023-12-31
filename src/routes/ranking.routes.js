import { Router } from "express"
import { openURL, ranking, URL} from "../controllers/ranking.controllers.js"

const rankingRouter = Router()

//exibe as urls da pessoa selecionada
rankingRouter.get("/urls/:id", URL)

//redireciona para a url selecionada e aumenta uma view
rankingRouter.get("/urls/open/:shortUrl", openURL)

//exibe as informações da tela ranking
rankingRouter.get("/ranking", ranking)

export default rankingRouter
