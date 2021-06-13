const { Router } = require('express')
const pedidosController = require('../../controllers/pedidosController')
const router = Router()

// obtener todos
router.get('/pedidos', pedidosController.encontrarTodosPedidos)

// obtener uno
router.get('/pedidos/:id', pedidosController.encontrarPedidoPorId)

// crear
router.post('/pedidos', pedidosController.crearPedido)

// actualizar
router.put('/pedidos/:id', pedidosController.actualizarPedido)

// eliminar
router.delete('/pedidos/:id', pedidosController.eliminarPedido)

router.post('/test', pedidosController.crearTest)

module.exports = router
