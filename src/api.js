var express = require("express");
var app = express();
app.use(express.urlencoded({extended  : true}));
app.use(express.json());

const router = express.Router();

// Autenticação do token
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

// começo de rotas
app.use('/',  router.get('/',(req,res)=>{
    res.status(200).send("<h1>API - CHAT </h1>")
}))

app.use('/',  router.get('/sobre',(req,res, next)=>{
    res.status(200).send({
        "nome":"API - CHAT",
        "versão": "0.1.0",
        "autor": "Diego Herold"
    })
}));

app.use('/',  router.get('/salas',(req,res, next)=>{
    const salaController = require("./controller/salaController");
    let resp = salaController.get();
    res.status(200).send(resp);
}));

app.use('/entrar',  router.post('/entrar',async(req,res, next)=>{
    const usuarioController = require("./controller/usuarioController");
    let resp = usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
    
}));

module.exports=app;