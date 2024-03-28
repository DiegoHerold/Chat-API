var express = require("express");
var app = express();
const token = require('./util/token');

app.use(express.urlencoded({extended  : true}));
app.use(express.json());


const router = express.Router(); 
// começo de rotas
app.use('/',  router.get('/',(req,res)=>{
    res.status(200).send("<h1>API - CHAT </h1>")
}))
//sobre a API
app.use('/',  router.get('/sobre',(req,res, next)=>{
    res.status(200).send({
        "nome":"API - CHAT",
        "versão": "0.1.0",
        "autor": "Diego Herold"
    })
}));


//Login do chat
app.use('/entrar',  router.post('/entrar',(req,res, next)=>{
    const usuarioController = require("./controller/usuarioController");
    let resp = usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

//Salas 
//entrar na sala
app.use("/sala/entrar", router.put("/sala/entrar", (async (req, res) => {
    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return res.status(401).send("Token inválido");
    let resp = await salaController.entrar(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);
})))

//listar salas
app.use("/salas",router.get("/salas",async (req, res, next)=>{
    if(await token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)){
        let resp = await salaController.get();
        res.status(200).send(resp);
    }else{
        res.status(400).send({msg:"Usuário não autorizado"});
    }
}))

//Mensagens 
//mandar mensagem
app.use("/sala/mensagem", router.post("/sala/mensagem"), async (req,res) =>{
    if(!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body._id);
    res.status(200).send(resp);
})
//listar mensagens
app.use("/sala/mensagens", router.get("/sala/mensagens", async (req,res)=>{
    if(!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
    return false;
    let resp = await salaController.buscarMensagens(req.query._idsala, req.query.timestamp);
    res.status(200).send(resp);

}))

module.exports=app;