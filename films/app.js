var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");

const Film = require("./src/models/film_model");

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// sets port 3001 to default or unless otherwise specified in the environment
app.set("port", process.env.PORT || 3001);

app.get("/", async(req, res) => {
    res.json({ msg: "films" });
});

app.get("/api/v1/films", async(req, res) => {
    const films = await Film.find({});
    res.json(films);
});

const NOT_FOUND = null;

// var findFilmByName = (myArray, key) => {
//     if (myArray) {
//         for (let i = 0; i < myArray.length; i++) {
//             if (myArray[i].name === key) {
//                 return myArray[i];
//             }
//         }
//     }
//     return null;
// };

app.post("/api/v1/films", async(req, res) => {
    let count = await Film.find({ name: req.body.name }).count();
    if (0 == count) {
        const films = new Film({
            name: req.body.name,
            rating: req.body.rating,
        });
        const savedFilm = await films.save();
        res.json(savedFilm);
    }
});

module.exports = app;