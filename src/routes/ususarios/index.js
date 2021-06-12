const { Router } = require('express')
const usuarioController = require('../../controllers/usuariosController')
const router = Router()

// obtener todos
router.get('/usuarios', usuarioController.encontrarTodos)

// obtener uno
router.get('/usuarios/:id', usuarioController.encontrarPorId)

// crear
router.post('/usuarios', usuarioController.crearUsuario)

// // actualizar
router.put('/usuarios/:id', usuarioController.actualizarUsuario)

// // eliminar
router.delete('/usuarios/:id', usuarioController.eliminarUsuario)

module.exports = router
