var express = require("express");
var app = express();
const token = require('./util/token');

app.use(express.urlencoded({extended  : true}));
app.use(express.json());


const router = express.Router();
const salaController = require("./controller/salaController");


// começo de rotas
app.use('/',  router.get('/',(req,res)=>{
    res.status(200).send("<h1>API -  CHAT </h1>")
}))
//sobre a API
app.use('/',  router.get('/sobre',(req,res, next)=>{
    res.status(200).send({
        "nome":"API - CHAT",
        "versão": "0.1.0",
        "autor": "Diego Herold"
    })
}));

//Chat
//entrar no chat
app.use('/entrar',  router.post('/entrar', async(req,res, next)=>{
    const usuarioController = require("./controller/usuarioController");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));
// sair do chat
app.use('/sair', router.put('/sair', async (req, res) => {
    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;

    const usuarioController = require('./controller/usuarioController');
    let resp = await usuarioController.sairChat(req.headers.iduser);

    res.status(200).send(resp);
}));

//Salas 
//entrar na sala
app.use("/sala/entrar/", router.put("/sala/entrar", (async (req, res) => {
    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return res.status(401).send("Token inválido");
    let resp = await salaController.entrar(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);
})))

// criar sala
app.use('/sala/criar', router.post('/sala/criar', async (req, res) => {
    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;

    // Extrair os dados necessários do corpo da requisição
    const { nome, tipo } = req.body;

    // Chamar o controlador para criar a sala
    let resp = await salaController.criarSala(req.headers.iduser, nome, tipo);
    res.status(200).send(resp);
}))

//sair da sala
app.use("/sala/sair", router.put("/sala/sair", async (req,res)=>{
    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return res.status(401).send("Token inválido");
    let resp = await salaController.sairSala(req.query.idSala, req.query.idUser);
    res.status(200).send(resp);

}))



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
//Enviar Mensagem
app.use("/sala/mensagem", router.post("/sala/mensagem"), async (req,res) =>{
    if(!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idSala);
    res.status(200).send(resp);
})
//listar mensagens
app.use("/sala/mensagens", router.get("/sala/mensagens", async (req,res)=>{
    if(!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
    return false;
    
    let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);

}))

module.exports=app;