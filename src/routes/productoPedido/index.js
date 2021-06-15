const { Router } = require('express')
const productoPedidosController = require('../../controllers/productosPedidosController')
const router = Router()

// obtener todos
router.get(
  '/productoPedido',
  productoPedidosController.encontrarTodosProductosPedidos
)

// obtener uno
router.get(
  '/productoPedido/:id',
  productoPedidosController.encontrarProductoPedidoPorId
)

router.get(
  '/productoPedido-pedido/:id',
  productoPedidosController.encontrarProductoPedidoPorIdPedido
)

module.exports = router
