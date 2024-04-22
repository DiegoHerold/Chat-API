const salaModel = require('../model/salaModel');

const usuarioModel = require('../model/usuarioModal');

exports.get = async()=>{
    return await salaModel.listarSalas();
}

exports.entrar = async (iduser,idsala)=>{

    console.log(iduser);
    console.log(idsala);

    const sala = await salaModel.buscarSala(idsala);
    console.log(sala)

    console.log(sala);

    let usuarioModel = require('../model/usuarioModal');

    let user = await usuarioModel.buscarUsuario(iduser);

    console.log(user);
    
    user.sala={_id:sala._id,nome:sala.nome, tipo:sala.tipo};
    if(await usuarioModel.alterarUsuario(user)){
        return {msg:"OK", timestamp:timestamp=Date.now()};
    }
    return false
}

exports.enviarMensagem =  async (nick, msg, idsala)=>{
    const sala = await salaModel.buscarSala(idsala);
        if(!sala.msgs){
            sala.msgs=[];
        }
        timestamp = Date.now();
        sala.msgs.push(
            {
                timestamp:timestamp,
                msg:msg,
                nick:nick
            }
        )
        let resp = await salaModel.atualizarMensagens(sala);
        return {"msg":"OK","timestamp":timestamp};
}

exports.buscarMensagens = async (idsala, timestamp)=>{
    console.log(timestamp);
    let mensagens= await salaModel.buscarMensagens(idsala, timestamp);
    console.log(mensagens);
    try{
    return{
        "timestamp": mensagens[mensagens.length-1].timestamp,
        "msgs": mensagens,
    };}
    catch(e){
        return{
        "timestamp": [],
        "msgs": mensagens,
        }
    }
}

exports.sairSala = async (idsala, iduser) => {
    const user = await usuarioModel.buscarUsuario(iduser);
   console.log(user);
    if (user) {
        await exports.enviarMensagem(iduser, "Saiu da sala!", idsala);
        delete user.sala;
  
        if (await usuarioModel.alterarUsuario(user)) {
            const timestamp = Date.now();
            return { msg: "OK", timestamp };
        }
    }
  
    return {"msg":"Erro"};
};

exports.criarSala = async (iduser, nome, tipo)=>{
    let usuarioModel = require('../model/usuarioModal');
    let user = await usuarioModel.buscarUsuario(iduser);
    let sala = await salaModel.criarSala(nome, tipo);
    user.sala = {_id:sala._id, nome:sala.nome, tipo:sala.tipo};
    if(await usuarioModel.alterarUsuario(user)) {
        return {msg:'Ok, sala criada', timestamp:timestamp=Date.now()};
    }
    return false;
}