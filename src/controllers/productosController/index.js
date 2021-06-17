const pool = require('../../database')
const { responseError } = require('../responseError')

class ProductosController {
  obtenerTodosProductos = async (_, res) => {
    try {
      const productos = await pool.query('SELECT * FROM producto')
      return res.status(200).json(productos)
    } catch {
      return responseError({ res })
    }
  }

  obtenerPorId = async (req, res) => {
    try {
      const { id } = req.params
      const producto = await pool.query('SELECT * FROM producto WHERE id = ?', [
        id,
      ])
      return res.status(200).json(producto)
    } catch {
      return responseError({ res })
    }
  }

  crearProducto = async (req, res) => {
    try {
      await pool.query('INSERT INTO producto set ?', [req.body])
      return res
        .status(200)
        .json({ mensaje: 'se ha creado el producto correctamente' })
    } catch {
      return responseError({ res })
    }
  }

  actualizarProducto = async (req, res) => {
    try {
      const { id } = req.params
      await pool.query('UPDATE producto set ? WHERE id = ?', [req.body, id])
      return res
        .status(200)
        .json({ mensaje: 'se ha actualizado el producto correctamente' })
    } catch {
      return responseError({ res })
    }
  }

  eliminarProducto = async (req, res) => {
    try {
      const { id } = req.params
      const promiseAll = []

      const producto_pedido = await pool.query(
        'SELECT * FROM producto_pedido WHERE id_producto = ?',
        [id]
      )

      const ProdPed = [...producto_pedido]
      ProdPed.forEach(({ id }) => {
        const productoPedido = pool.query(
          'DELETE FROM producto_pedido WHERE id = ?',
          [id]
        )
        promiseAll.push(productoPedido)
      })
      await Promise.all(promiseAll)
      await pool.query('DELETE FROM producto WHERE id = ?', [id])
      return res.status(200).json({ mensaje: 'el producto ha sido eliminado' })
    } catch (error) {
      console.log(error)
      return responseError({ res })
    }
  }

  obtenerProductosDeCategorias = async (req, res) => {
    try {
      const { idCategoria } = req.params
      const productos = await pool.query(
        `
      SELECT
        *
      FROM producto
      WHERE id_categoria_producto = ?`,
        [idCategoria]
      )
      return res.status(200).json(productos)
    } catch {
      return responseError({ res })
    }
  }
}

const productosController = new ProductosController()
module.exports = productosController
