const { Router } = require('express');
const router = Router();
const Producto = require('../model/Producto');
const UserInfo = require('../model/UserInfo');
const Usuario = require('../model/Usuario');
const mongoose = require('mongoose');

const db = 'Productos';

const jwt = require('jsonwebtoken');

//CREAR UNA CUENTA
router.post('/Create', async (req, res) => {
    const { nombre,
        userName,
        email,
        password,
        rol, 
        } = req.body;

        const newUser = new Usuario({
            userName, 
            email, 
            password,
             rol});
        await newUser.save();     

        const token = jwt.sign({_id: newUser._id}, 'ninjaSecret');
        res.status(200).json(token);
});

//LOGIN
router.post('/Login', async (req, res) => {
    const mostrar = async () =>{
        const { email,
            password,
            rol
        } = req.body;

        console.log(req.body);

        const newUserInfo = Usuario({
            email, 
            password,
            rol
            });
       
        //recuperamos el registro
        const userInfo = await Usuario.findOne({email})
      
        //validaciones simples (Hace falta encriptarlas)
        if(!userInfo.email) return res.status(401).send("El email no exite");
        if(userInfo.password !== password) return res.status(401).send("El password no coincide")
        //Obtenemos el rol
        this.rol = userInfo.rol;
        //Generamos el token
        const token =jwt.sign({_id: userInfo._id}, 'ninjaSecret');
        res.status(200).json( {token: token, rol: this.rol} );
    }
    mostrar();
});

//OBTENER PRODUCTOS
router.get('/productos', async (req, res) => {
    const mostrar = async () =>{
        const productos = await Producto.find({})
        res.send(productos);
    }
    mostrar();
});

//OBTENER UN PRODUCTO
router.get('/:id', async (req, res) => {
    const productoId = req.params.id;
    const producto = async (productoId) => {
        const producto = await Producto.findById({_id: productoId});
        return res.send(producto);
    }
    producto(productoId);
});

//CREAR UN PRODUCTO
router.post('/productos', async (req, res) => {
    const { nombre,
            descripcion,
            sku,
            imagen,
            categorias, 
            precio,
            stock } = req.body;

    const newProducto = new Producto({
        nombre,
        descripcion,
        sku,
        imagen,
        categorias, 
        precio, 
        stock,
    });
   //console.log(newProducto);
    await newProducto.save();
    res.send('Productos');
})

//ACTUALIZAR UN PRODUCTO
router.put('/producto/:id', async (req, res) => {
    const productoId = req.params.id;
    const producto = async (productoId) => {
        const producto = await Producto.findByIdAndUpdate({_id: productoId});
        producto.nombre= req.body.nombre ;
        producto.descripcion= req.body.descripcion ;
        producto.sku= req.body.sku;
        producto.imagen= req.body.imagen;
        producto.categorias= req.body.categorias;
        producto.precio = req.body.precio;
        producto.stock = req.body.stock ;
        await producto.save();
        return res.send(producto);
    }
    producto(productoId);
});

//ELIMINAR UN PRODUCTO
router.delete('/producto/:id', async (req, res) => {
    const productoId = req.params.id;
    const producto = async (productoId) => {
        const producto = await Producto.findByIdAndDelete({_id: productoId});
        return res.send(producto);
    }
    producto(productoId);
});


module.exports = router;