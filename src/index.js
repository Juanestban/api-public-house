const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 2500)

// routes
app.use(routes)

app.listen(app.get('port'), () => {
  console.log('listen on port', app.get('port'))
})
