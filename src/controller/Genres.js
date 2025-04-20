const {Videogame, Genre } = require("../db")
const axios = require("axios")
const getGenres = async (req, res) => {
    console.log("generos aca")
    try {
        let arrgenres = []
        for (let i = 1; i < 6; i++) {
            let apigenres = await axios.get(`https://api.rawg.io/api/games?dates=2022-09-01&key=4f316582b06b40f6bae38af1cf60962d&page=${i}`);
            const result = apigenres.data.results;
            arrgenres = [...arrgenres, ...result]
        }
        const mapgenres = arrgenres?.map(gen => {
            return genres = gen.genres?.map(allgenres => allgenres.name);

        })
        const array = [];
        const generes = [];
        mapgenres.forEach(function (aux) {
            aux.forEach(function (element) {
                array.push(element);
            });
        });

        let filter = array.filter(function (item, index) {
            return array.indexOf(item) === index;
        });
        console.log(arrgenres)
        for (let i = 0; i < filter.length; i++) {
            generes.push({ name: filter[i] })
        }
        await Genre.bulkCreate(generes)

        res.json(generes)
        // res.json({ msg: "Creacion de generos correcta" })
    } catch (error) {
        // res.send({ msg: error })
    }
}
const posGenre = async (req, res) => {
    const { name } = req.body
    const newGenre = await Genre.create({ name })
    res.json(newGenre);
}


const getGenre = async (req, res) => {

    const generos = await axios.get(`https://api.rawg.io/api/genres?key=4f316582b06b40f6bae38af1cf60962d`)

    const gen = await generos.data.results?.map(gen => {

        return {
            name: gen.name,
            id: gen.id
        }

    })
    
    for (const iterator of gen) {
        await Genre.create({
            id: iterator.id,
            name: iterator.name
        })
    }

    
    // res.json(generos)
    res.send("hola")
}

const getTipeGenre = async (req, res) => {
    const { genre } = req.query
    const genretype = await Videogame.findAll({
        include: [{
            model: Genre,
            where:{
                name:genre
            }
        }]
        

    })
    res.json(genretype)
}

module.exports = { getGenre, posGenre, getTipeGenre }