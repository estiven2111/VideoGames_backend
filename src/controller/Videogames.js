const axios = require("axios");
const { Videogame, Genre } = require("../db");
const Genres = require("../models/Genres");
const { Op } = require("sequelize")


//! BUSCAR POR NOMBRE EN API Y DB
const getGames = async (req, res) => {
    const { name, id } = req.query;
    const nombre = name.toUpperCase().split(" ").join("-")
    //? nameGamesBD obtiene los juegos
   try {
    const nameGamesBD = await Videogame.findAll({
        where:
        {
            name: {[Op.substring]:`%${nombre}%`}
        },
        include: Genre

    })
    
    const nameGamesBDs = nameGamesBD?.map((result) => {
        const platform = result.platforms?.map((plat) => plat.platform.name)
        const genres = result.genres?.map(gen => gen.name)
        console.log("los resultado", result.image)
        return {
            id: result.id,
            name: result.name,
            platform: platform,
            released: result.released,
            background_image: result.image,
            rating: result.rating,
            genres: genrs
        }
    })

    //!pedido a la api por nombre

    const url = `https://api.rawg.io/api/games?search=${name}&key=4f316582b06b40f6bae38af1cf60962d`;

    //? Busca en la api los primeros 15 juegos segun el nombre
    const nameGamesurl = await axios.get(url);
    const apigames = nameGamesurl.data.results.slice(0, 15);
    //? fullgames obtiene el array de obj
    const fullgame = apigames?.map((result) => {
        const platform = result.platforms?.map((plat) => plat.platform.name)
        const genres = result.genres?.map(gen => gen.name)

        return {
            id: result.id,
            name: result.name,
            platform: platform,
            released: result.released,
            background_image: result.background_image,
            rating: result.rating,
            genres: genres
        }
    })
    // console.log("base datos:  ",nameGamesBD)
    // console.log("apirest:  ",fullgames)
    const unionGames = [...nameGamesBDs, ...fullgames]
    res.json(unionGames)
    // res.json(nameGamesurl.data.results);


   } catch (error) {
    res.json({error: `en la peticion de nombre: ${error}` })
   }
    
}

//! BUSCAR POR ID EN BD Y API
const getIdGames = async (req, res) => {
    const { id } = req.params
    
    // diferenciar uuid
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[8|9|aA|bB][0-9a-f]{3}-[0-9a-f]{12}$/i;
    // entra a buscar en la bd
    if (uuidRegex.test(id)) {
        const Games = await Videogame.findOne({
            where: { id: id },
            include: Genre
        })
        const genres = Games.genres?.map(gen => gen.name)

        const GamesBD = {
            id: Games.id,
            name: Games.name,
            platform: Games.platform,
            released: Games.released,
            background_image: Games.background_image,
            rating: Games.rating,
            genres: genres,
            description:Games.description
        }
        res.status(200).json(GamesBD);
    } else {
        const url = `https://api.rawg.io/api/games/${id}?key=4f316582b06b40f6bae38af1cf60962d`
        const idGames = await axios.get(url);

        try {
            const plataform = idGames.data.platforms?.map(response => response.platform.name);
            const geners = idGames.data.genres?.map(response => response.name);
            const description = idGames.data.description.replace(/<[^>]+>/g, "")
            console.log(description)
            const idFullGames = {
                id: idGames.data.id,
                name: idGames.data.name,
                description: description,
                released: idGames.data.released,
                background_image: idGames.data.background_image,
                rating: idGames.data.rating,
                platform: plataform,
                genres: geners
            }

            res.status(200).json(idFullGames)
        } catch (error) {
            res.status(400).json({ msg: error })
        }
    }


}

//! MUESTRA LOS PRIMEROS 100 JUEGOS 
const getGamesfull = async (req, res) => {
    let allGames = [];
    for (let i = 1; i < 6; i++) {
        let games = await axios.get(`https://api.rawg.io/api/games?dates=2022-09-01&key=4f316582b06b40f6bae38af1cf60962d&page=${i}`);
        const allVideogames = games.data.results;
        allGames = [...allGames, ...allVideogames]
    }
    const datos = await allGames?.map((response) => {

        const { id, name, background_image, rating, description, released } = response
        const Ratings = response.ratings?.map(allRating => allRating.title);
        const platforme = response.platforms?.map(allplataform => allplataform.platform.name);
        const genres = response.genres?.map(allgenres => allgenres.name);

        return {
            id,
            name,
            background_image,
            platforms: platforme,
            description: description,//vacio viene
            released: released,
            rating,
            ratings: Ratings,
            genres: genres
        }
    })

    const nameGamesBD = await Videogame.findAll({
        include: Genre
    })
   
    const nameGamesBDs = nameGamesBD?.map((result) => {
        const platform = result.platforms?.map((plat) => plat.platform.name)
        const genres = result.genres?.map(gen => gen.name)
        return {
            id: result.id,
            name: result.name,
            platform: platform,
            released: result.released,
            background_image: result.background_image,
            rating: result.rating,
            genres: genres
        }
    })
    console.log("despues",nameGamesBDs.background_image)
    const unionGames = [...datos, ...nameGamesBDs]  //?spread operator
    res.json(unionGames)
    //! Model.bulkCreate(all)//?guarda todo el array de obj
}


//! CREA UN JUEGO Y LO GUARDA EN LA BD
const posGames = async (req, res) => {
    try {
        const {
            name,
            platform,
            released,
            background_image,
            rating,
            description,
            genres
        } = req.body
        const dat = { name,
            platform,
            released,
            background_image,
            rating,
            description,
            genres}
            
        const Nombre = name.toUpperCase().split(" ").join("-")
        
        const newGame = await Videogame.create({
            name: Nombre,
            platform,
            released,
            background_image,
            rating,
            description,
        });
        console.log(dat)
        // // const obtenerid = await genres.findAll({
        // //     where: {
        // //         name: "accion"
        // //     }

        // // })
        for (const ite of genres) {
            let gen = await Genre.findByPk(ite);
            await newGame.addGenres(gen);
        }
        //  console.log("nuevo jueo es:",newGame)
        res.json("JUEGO CREADO CON EXITO")
    } catch (error) {

    }

}

async function filtrado(obj) {
    const datos = await allGames?.map((response) => {

        const { id, name, background_image, rating, description, released } = response
        const Ratings = response.ratings?.map(allRating => allRating.title);
        const platforme = response.platforms?.map(allplataform => allplataform.platform.name);
        const genres = response.genres?.map(allgenres => allgenres.name);

        return {
            id,
            name,
            background_image,
            platforms: platforme,
            description: description,//vacio viene
            released: released,
            rating,
            ratings: Ratings,
            genres: genres
        }
    })
}


module.exports = { getGames, getIdGames, getGamesfull, posGames }