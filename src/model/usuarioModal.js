const db = require("./db");



async function registrarUsuario(nick){
    return await db.insertOne("Usuario",{"nick": nick});
}

async function buscarUsuario(idUser){
    let user = await db.findOne("Usuario",idUser);
    console.log("user no usuario modal: "+user);
    return user;
}

async function alterarUsuario(user){
    return await db.updateOne("Usuario",user,{_id:user._id})
}

module.exports = {registrarUsuario,buscarUsuario,alterarUsuario};