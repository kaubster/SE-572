var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var filmArray = [];

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
    res.json(filmArray);
});

const NOT_FOUND = null;

var findFilmByName = (myArray, key) => {
    if (myArray) {
        for (let i = 0; i < myArray.length; i++) {
            if (myArray[i].name === key) {
                return myArray[i];
            }
        }
    }
    return null;
};

app.post("/api/v1/films", async(req, res) => {
    if (NOT_FOUND == findFilmByName(filmArray, req.body.name)) {
        filmArray.push({
            name: req.body.name,
            rating: req.body.rating,
        });
    }
});

module.exports = app;