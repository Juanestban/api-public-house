const { Router } = require('express')
const pedidosController = require('../../controllers/pedidosController')
const router = Router()

// obtener todos
router.get('/pedidos', pedidosController.encontrarTodosPedidos)

// obtener uno
router.get('/pedidos/:id', pedidosController.encontrarPedidoPorId)

// crear
router.post('/pedidos', pedidosController.crearPedido)

// finalizar pedido
router.put('/pedidos/:id', pedidosController.finalizarPedido)

// eliminar
router.delete('/pedidos/:id', pedidosController.eliminarPedido)

// test
router.post('/test', pedidosController.crearTest)

module.exports = router
