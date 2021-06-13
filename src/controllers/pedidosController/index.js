const pool = require('../../database')
const { responseError } = require('../responseError')

class PedidosController {
  encontrarTodosPedidos = async (_, res) => {
    try {
      // traer el resultado INNER JOIN de la tabla ['pedido'] y ['producto_pedido']
      // preferencia un middleware para ambas peticiones por 'GET'
      // mostrar tambien la tabla ['estado_pedido']
      const pedidos = await pool.query('SELECT * FROM pedido')
      return res.status(200).json(pedidos)
    } catch {
      return responseError({ res })
    }
  }

  encontrarPedidoPorId = async (req, res) => {
    try {
      // traer el resultado INNER JOIN de la tabla ['pedido'] y ['producto_pedido']
      // preferencia un middleware
      // mostrar tambien la tabla ['estado_pedido']
      const { id } = req.params
      const pedido = await pool.query('SELECT * FROM pedido WHERE id = ?', [id])
      return res.status(200).json(pedido)
    } catch {
      return responseError({ res })
    }
  }

  // mirar esta sentencia para mejorar
  crearPedido = async (req, res) => {
    try {
      // primero se crea el pedido con relacion de la tabla ['estado_pedido']
      // luego se crea producto_pedido[tabla]
      await pool.query('INSERT INTO pedido set ?', [req.body])
      return res
        .status(200)
        .json({ mensaje: 'se ha creado el pedido correctamente' })
    } catch {
      return responseError({ res })
    }
  }

  // falta finalizar el pedido
  // cuando finalize se ha de descontar la cantidad del pedido del stock del producto

  // mirar esta sentencia
  actualizarPedido = async (req, res) => {
    try {
      const { id } = req.params
      await pool.query('UPDATE pedido set ? WHERE id = ?', [req.body, id])
      return res
        .status(200)
        .json({ mensaje: 'se ha actualizado el pedido correctamente' })
    } catch {
      return responseError({ res })
    }
  }

  eliminarPedido = async (req, res) => {
    try {
      const { id } = req.params
      await pool.query('DELETE FROM pedido WHERE id = ?', [id])
      return res
        .status(200)
        .json({ mensaje: 'se ha eliminado el pedido correctamente' })
    } catch {
      return responseError({ res })
    }
  }
}

const pedidosController = new PedidosController()
module.exports = pedidosController
