const salaModel = require('../model/salaModel');

exports.get = async()=>{
    return await salaModel.listarSalas();
}

exports.entrar = async (iduser,idsala)=>{

    console.log(iduser);
    console.log(idsala);

    const sala = await salaModel.buscarSala(idsala);

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
    let mensagens= await salaModel.buscarMensagens(idsala, timestamp);
    return{
        "timestamp": mensagens[mensagens.length -1].timestamp,
        "msgs": mensagens
    };
}