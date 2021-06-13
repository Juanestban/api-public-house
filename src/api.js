const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const serverless = require('serverless-http')
const routes = require('./routes')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 2500)

// routes
app.use('/.netlify/functions', routes)

module.exports.handler = serverless(app)
