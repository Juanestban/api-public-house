const pool = require('../../database')
const { responseError } = require('../responseError')

class ProductosPedidosController {
  encontrarTodosProductosPedidos = async (_, res) => {
    try {
      const pedidos = await pool.query(`SELECT * FROM producto_pedido`)
      return res.status(200).json(pedidos)
    } catch {
      return responseError({ res })
    }
  }

  encontrarProductoPedidoPorId = async (req, res) => {
    try {
      const { id } = req.params
      const pedido = await pool.query(
        `SELECT * FROM producto_pedido WHERE id = ?`,
        [id]
      )
      return res.status(200).json(pedido)
    } catch {
      return responseError({ res })
    }
  }
}

const productosPedidosController = new ProductosPedidosController()
module.exports = productosPedidosController
