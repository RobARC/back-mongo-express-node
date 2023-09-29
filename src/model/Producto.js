const { Schema, model } = require('mongoose') 

const productoSchema = new Schema({ 
    "nombre": String,
    "descripcion": String,
    "sku": String,
    "imagen": String,
    "categorias": [String, String],
    "precio": Number,
    "stock": Number,
});

const Producto = model('Producto', productoSchema);

module.exports = Producto;