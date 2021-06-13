const pool = require('../../database')
const { responseError } = require('../responseError')

class PedidosController {
  encontrarTodosPedidos = async (_, res) => {
    try {
      const pedidos = await pool.query(`SELECT
        pedido.id,
        est_ped.nombre AS estado_pedido,
        pedido.precio_total,
        pedido.id_usuario
      FROM
        pedido
      INNER JOIN estado_pedido AS est_ped ON
       est_ped.id = pedido.id_estado_pedido`)
      return res.status(200).json(pedidos)
    } catch {
      return responseError({ res })
    }
  }

  encontrarPedidoPorId = async (req, res) => {
    try {
      const { id } = req.params
      const pedido = await pool.query(
        `SELECT
          pedido.id,
          est_ped.nombre AS estado_pedido,
          pedido.precio_total,
          pedido.id_usuario
        FROM pedido
        INNER JOIN estado_pedido AS est_ped ON
          est_ped.id = pedido.id_estado_pedido WHERE pedido.id = ?`,
        [id]
      )
      return res.status(200).json(pedido)
    } catch {
      return responseError({ res })
    }
  }

  crearPedido = async (req, res) => {
    try {
      const { body } = req
      const pedido = {
        precio_total: body.precio_total,
        id_estado_pedido: 1,
        id_usuario: body.id_usuario,
      }

      const { insertId } = await pool.query('INSERT INTO pedido set ?', [
        pedido,
      ])

      const promiseAll = []
      const { productos } = body
      const productoArray = [...productos]
      const formateadoProductos = productoArray.map((pedidoProducto) => ({
        ...pedidoProducto,
        id_pedido: insertId,
      }))

      formateadoProductos.forEach((producto) => {
        const productoPromise = pool.query(
          'INSERT INTO producto_pedido set ?',
          [producto]
        )
        promiseAll.push(productoPromise)
      })
      await Promise.all(promiseAll)
      return res
        .status(200)
        .json({ mensaje: 'se ha creado el pedido correctamente' })
    } catch (error) {
      console.log(error)
      return responseError({ res })
    }
  }

  // falta finalizar el pedido
  // cuando finaliza se ha de disminuir la cantidad del pedido del stock del producto pedido
  finalizarPedido = async (req, res) => {}

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

  crearTest = async (req, res) => {
    const { insertId } = await pool.query('INSERT INTO test set ?', [req.body])
    // console.log(response)
    res.status(200).json({ mensaje: 'nice', idTest: insertId })
  }
}

const pedidosController = new PedidosController()
module.exports = pedidosController
