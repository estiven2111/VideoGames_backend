const { Router } = require("express");
const {getGames, getIdGames, getGamesfull, posGames } = require ("../controller/Videogames")
const gamesRouter = Router();


gamesRouter.get("/videogames",getGames)//? busca por  nombre el video juego

gamesRouter.get("/:id",getIdGames);//? retorna el detalle del video juego

gamesRouter.get("/", getGamesfull);//? retorna todos los video juegos

gamesRouter.post("/",posGames);//? envia ala base de datos los nuevos video juegos



module.exports = gamesRouter;