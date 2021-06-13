const { Router } = require('express')
const pedidosController = require('../../controllers/productosPedidosController')
const router = Router()

// obtener todos
router.get('/productoPedido', pedidosController.encontrarTodosProductosPedidos)

// obtener uno
router.get(
  '/productoPedido/:id',
  pedidosController.encontrarProductoPedidoPorId
)

module.exports = router
