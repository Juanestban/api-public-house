const pool = require('../../database')
const { responseError } = require('../responseError')

class CategoriasProductos {
  encontrarCateProductosTodos = async (_, res) => {
    try {
      const categoriasProductos = await pool.query(
        'SELECT * FROM categoria_producto'
      )
      return res.status(200).json(categoriasProductos)
    } catch {
      return responseError({ res })
    }
  }

  encontrarCateProductosPorId = async (req, res) => {
    try {
      const { id } = req.params
      const categoriasProductos = await pool.query(
        'SELECT * FROM categoria_producto WHERE id = ?',
        [id]
      )
      return res.status(200).json(categoriasProductos)
    } catch {
      return responseError({ res })
    }
  }

  crearCateProducto = async (req, res) => {
    try {
      await pool.query('INSERT INTO categoria_producto set ?', [req.body])
      return res.status(200).json({
        mensaje: 'se ha creado una categoria para los productos correctamente',
      })
    } catch (error) {
      console.log(error)
      return responseError({ res })
    }
  }

  actualizarCateProducto = async (req, res) => {
    try {
      const { id } = req.params
      await pool.query('UPDATE categoria_producto set ? WHERE id = ?', [
        req.body,
        id,
      ])
      return res.status(200).json({
        mensaje:
          'se ha actualizado una categoria para los productos correctamente',
      })
    } catch {
      return responseError({ res })
    }
  }

  eliminarCateProducto = async (req, res) => {
    try {
      const { id } = req.params
      const promiseAll = []

      const productos_table = await pool.query(
        'SELECT * FROM producto WHERE id_categoria_producto = ?',
        [id]
      )
      const productos = [...productos_table]
      productos.forEach(({ id }) => {
        const prodPedidos = pool.query(
          'DELETE FROM producto_pedido WHERE id_producto = ?',
          [id]
        )
        promiseAll.push(prodPedidos)
      })
      await Promise.all(promiseAll)
      await pool.query('DELETE FROM producto WHERE id_categoria_producto = ?', [
        id,
      ])
      await pool.query('DELETE FROM categoria_producto WHERE id = ?', [id])
      return res
        .status(200)
        .json({ mensaje: 'la categoria para los productos ha sido eliminada' })
    } catch {
      return responseError({ res })
    }
  }
}

const categoriasProductos = new CategoriasProductos()
module.exports = categoriasProductos
