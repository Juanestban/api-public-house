const responseError = ({ res }) =>
  res.status(400).json({ mensaje: 'error en la peticion' })

module.exports = { responseError }
