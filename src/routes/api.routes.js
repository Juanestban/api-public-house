const express = require('express')
const app = express()
const { Router } = express
const router = Router()

// inicio
router.get('/', (_, res) => {
  return res.status(200).json({ ok: true, mensaje: 'Hello, world!' })
})

// usuarios
router.use(require('./ususarios'))

// categorias de productos
router.use(require('./categoriasProductos'))

// productos
router.use(require('./productos'))

// pedidos
router.use(require('./pedidos'))

// productos pedidos
router.use(require('./productoPedido'))

module.exports = { router, app }
