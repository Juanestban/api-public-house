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
      await pool.query('DELETE FROM producto WHERE id = ?', [id])
      return res.status(200).json({ mensaje: 'el producto ha sido eliminado' })
    } catch {
      return responseError({ res })
    }
  }
}

const productosController = new ProductosController()
module.exports = productosController
