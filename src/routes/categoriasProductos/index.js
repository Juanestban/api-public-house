const { Router } = require('express')
const catProductosController = require('../../controllers/categoriasProductosController')
const router = Router()

// obtener todos
router.get(
  '/categoriasProductos',
  catProductosController.encontrarCateProductosTodos
)

// obtener uno
router.get(
  '/categoriasProductos/:id',
  catProductosController.encontrarCateProductosPorId
)

// // crear
router.post('/categoriasProductos', catProductosController.crearCateProducto)

// // // actualizar
router.put(
  '/categoriasProductos/:id',
  catProductosController.actualizarCateProducto
)

// // // eliminar
router.delete(
  '/categoriasProductos/:id',
  catProductosController.eliminarCateProducto
)

module.exports = router
