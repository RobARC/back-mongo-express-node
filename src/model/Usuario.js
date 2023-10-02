const { Schema, model } = require('mongoose') 

const usuarioSchema = new Schema({ 
    "userName": String,
    "email": String,
    "password": String,
    "rol": String,

});

const Usuario = model('Usuarios', usuarioSchema);

module.exports = Usuario;