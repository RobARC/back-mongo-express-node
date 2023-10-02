require('dotenv').config();
const { Producto } = require('./model/Producto');
const { Schema, model, connect} = require('mongoose') 


const uri = process.env.DB_URI_LOCAL;
//const uri2 = process.env.DB_URI;

console.log(uri);

connect(uri)

.then( () => console.log('Connected to database OK'))
.catch( (e) => console.log('Error connecting to database' + e));

const productoModel = model('Productos', new Schema (Producto));
// Works
productoModel.findOne();