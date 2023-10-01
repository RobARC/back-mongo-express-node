const { Router } = require('express');
const router = Router();
const Producto = require('../model/Producto');
const mongoose = require('mongoose');

const db = 'Productos';

//OBTENER PRODUCTOS
router.get('/', async (req, res) => {
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