const db = require("./db");


async function insertOne(collection, objeto){
    const db = await connect();
    return db.collection(collection).insertOne(objeto);
}


async function registrarUsuario(nick){
    return await db.insertOne("Usuario",{"nick": nick});
}

async function buscarUsuario(idUser){
    let user = await db.findOne("usuarios",idUser);
    return user;
}

async function alterarUsuario(user){
    return await db.updateOne("usuarios",user,{_id:user._id})
}

module.exports = {registrarUsuario, insertOne,buscarUsuario,alterarUsuario};