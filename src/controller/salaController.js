const salaModel = require('../model/salaModel');

exports.get = async()=>{
    return await salaModel.listarSalas();
}