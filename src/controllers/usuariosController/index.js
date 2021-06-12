const pool = require('../../database')
const { responseError } = require('../responseError')

class UsuariosController {
  encontrarTodos = async (_, res) => {
    try {
      const usuarios = await pool.query('SELECT * FROM usuario')
      return res.status(200).json(usuarios)
    } catch {
      return responseError({ res })
    }
  }

  encontrarPorId = async (req, res) => {
    try {
      const { id } = req.params
      const usuario = await pool.query('SELECT * FROM usuario WHERE id = ?', [
        id,
      ])
      return res.status(200).json(usuario)
    } catch {
      return responseError({ res })
    }
  }

  crearUsuario = async (req, res) => {
    try {
      await pool.query('INSERT INTO usuario set ?', [req.body])
      return res
        .status(200)
        .json({ mensaje: 'se ha creado el usuario correctamente' })
    } catch {
      return responseError({ res })
    }
  }

  actualizarUsuario = async (req, res) => {
    try {
      const { id } = req.params
      await pool.query('UPDATE usuario set ? WHERE id = ?', [req.body, id])
      return res
        .status(200)
        .json({ mensaje: 'se ha actualizado el usuario correctamente' })
    } catch {
      return responseError({ res })
    }
  }

  eliminarUsuario = async (req, res) => {
    try {
      const { id } = req.params
      await pool.query('DELETE FROM usuario WHERE id = ?', [id])
      return res.status(200).json({ mensaje: 'el usuario ha sido eliminado' })
    } catch {
      return responseError({ res })
    }
  }
}

const usuariosController = new UsuariosController()

module.exports = usuariosController
