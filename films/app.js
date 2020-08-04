var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var cors = require("cors");

const Film = require("./src/models/film_model");

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// sets port 3000 to default or unless otherwise specified in the environment
app.set("port", process.env.PORT || 3000);

// sets port 3000 to default or unless otherwise specified in the environment
app.set(
    "secretKey",
    process.env.SECRET_KEY || "8a5db32a313d4704a8907cea724d204b"
);

app.get("/", async(req, res) => {
    res.json({ msg: "films" });
});

app.get("/api/v1/films", async(req, res) => {
    const films = await Film.find({});
    res.json(films);
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1];
        const secretKey = app.get("secretKey");
        jwt.verify(bearerToken, secretKey, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}

app.post("/api/v1/films", verifyToken, async(req, res) => {
    let count = await Film.find({ name: req.body.name }).count();
    if (0 == count) {
        const films = new Film({
            name: req.body.name,
            rating: req.body.rating,
        });
        const savedFilm = await films.save();
        res.json(savedFilm);
    } else {
        res.sendStatus(400);
    }
});

app.post("/api/v1/login", (req, res) => {
    const user = {
        username: req.body.username,
    };
    const secretKey = app.get("secretKey");
    jwt.sign({ user }, secretKey, (err, token) => {
        res.json({
            token,
        });
    });
});

module.exports = app;