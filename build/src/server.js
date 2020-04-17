"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
const cors_1 = __importDefault(require("cors"));
//const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.set("port", process.env.PORT || 8080);
app.use(cors_1.default());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let peso = 0;
let reps = 0;
let sets = 0;
let Treps = 0;
let Tsets = 0;
let buenas = 0;
let malas = 0;
let ejer = 1;
let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);
app.get("/", (req, res) => {
    res.send("funciona!! (^_^)/");
});
app.post('/actualizar', (req, res) => {
    peso = req.body.peso;
    reps = req.body.r;
    sets = req.body.s;
    Treps = req.body.tr;
    Tsets = req.body.ts;
    buenas = req.body.buenas;
    malas = req.body.malas;
    ejer = req.body.e;
    console.log(peso);
    io.sockets.emit('getPeso', peso);
    io.sockets.emit('getReps', reps);
    io.sockets.emit('getSets', sets);
    io.sockets.emit('getTr', Treps);
    io.sockets.emit('getTs', Tsets);
    io.sockets.emit('buenas', buenas);
    io.sockets.emit('malas', malas);
    io.sockets.emit('ejercicio', ejer);
    res.send("ok");
});
// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function (socket) {
    console.log("a user connected");
    socket.emit('prueba', 'hola mundo');
    socket.emit('getPeso', peso);
    socket.emit('getReps', reps);
    socket.emit('getSets', sets);
    socket.emit('getTr', Treps);
    socket.emit('getTs', Tsets);
    socket.emit('buenas', buenas);
    socket.emit('malas', malas);
    socket.emit('ejercicio', ejer);
});
const server = http.listen(8080, function () {
    console.log("listening on *:8080");
});
