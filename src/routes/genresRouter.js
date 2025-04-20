const { Router } = require("express");
const {getGenre,posGenre,getTipeGenre} = require("../controller/Genres")

const genresRouter = Router();

 genresRouter.get("/", getGenre);
 genresRouter.post("/",posGenre)
 genresRouter.get("/genres",getTipeGenre)



module.exports = genresRouter;