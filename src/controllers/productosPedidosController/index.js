const pool = require('../../database')
const { responseError } = require('../responseError')

class ProductosPedidosController {
  encontrarTodosProductosPedidos = async (_, res) => {
    try {
      const pedidos = await pool.query(
        `SELECT
          prod_ped.id,
          prod_ped.cantidad,
          prod_ped.precio_cantidad,
          prod_ped.id_producto,
          prod_ped.id_pedido,
          pd.nombre as nombre_producto
        FROM producto_pedido AS prod_ped
        INNER JOIN producto AS pd ON
          pd.id = prod_ped.id_producto`
      )
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

  encontrarProductoPedidoPorIdPedido = async (req, res) => {
    try {
      const { id } = req.params
      const pedido = await pool.query(
        `SELECT
          prod_ped.id,
          prod_ped.cantidad,
          prod_ped.precio_cantidad,
          prod_ped.id_producto,
          prod_ped.id_pedido,
          pd.nombre as nombre_producto,
          pd.icono
        FROM producto_pedido AS prod_ped
        INNER JOIN producto AS pd ON
          pd.id = prod_ped.id_producto
        WHERE id_pedido = ?`,
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
