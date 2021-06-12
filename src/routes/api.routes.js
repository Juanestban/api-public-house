const express = require('express')
const app = express()
const { Router } = express
const router = Router()

// inicio
router.get('/', (_, res) => {
  return res.status(200).json({ ok: true, mensaje: 'Hello, world!' })
})

// usuarios

// categorias

// productos

// pedidos

module.exports = { router, app }
