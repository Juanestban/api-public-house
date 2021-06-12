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
// router.use(require(''))

// productos
// router.use(require(''))

// pedidos
// router.use(require(''))

module.exports = { router, app }
