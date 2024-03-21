const db = require(".db");


async function insertOne(collection, objeto){
    const db = await connect();
    return db.collection(collection).insertOne(objeto);
}


async function registrarUsuario(nick){
    return await db.insertOne("Usuario",{"nick": nick});
}



module.exports = {registrarUsuario, insertOne};