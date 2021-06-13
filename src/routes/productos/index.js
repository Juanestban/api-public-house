const { Router } = require('express')
const productosController = require('../../controllers/productosController')
const router = Router()

// obtener todos
router.get('/productos', productosController.obtenerTodosProductos)

// obtener uno
router.get('/productos/:id', productosController.obtenerPorId)

// crear
router.post('/productos', productosController.crearProducto)

// // actualizar
router.put('/productos/:id', productosController.actualizarProducto)

// // eliminar
router.delete('/productos/:id', productosController.eliminarProducto)

module.exports = router
