const { Timestamp } = require("mongodb");
const db = require("./db")

let listarSalas = async()=>
{
    let salas = await db.findAll("salas");
    return salas
}

let buscarSala = async (idsala)=>{
    return db.findOne("salas",idsala);
}

let atualizarMensagens = async (sala)=>{
    return await db.updateOne("salas",sala,{_id:sala._id})
}

let buscarMensagens = async(idsala,timestamp)=>{
    
    let sala = await buscarSala(idsala);
    if(sala.msgs){
        let msgs =[];
        sala.msgs.forEach((msg)=>{
            if(msg.timestamp >= timestamp){
                msgs.push(msg);
            }
        });
        return msgs;
    }
    return [];
}

let registrarSala = async (data)=> {
    return await db.insertOne("salas", data);
  }


  let criarSala = async (nome, tipo)=>{
    let sala = {
        nome:nome,
        tipo:tipo
    }
    return await db.insertOne('salas', sala);
}

  
let sairSala = async (collection, documentoId)=> {
    // Use o ObjectId para procurar o documento pelo ID
    const filtroDocumento = { _id: new ObjectId(documentoId) };
  
    // Use $unset para remover o campo 'sala'
    const atualizacao =  {sala: 1 };
  
    const result = await db.findOneAndUpdate(
      filtroDocumento,
      atualizacao
    );
  
    return result;
  }

module.exports = {listarSalas, buscarSala, atualizarMensagens, buscarMensagens, registrarSala,sairSala,criarSala}