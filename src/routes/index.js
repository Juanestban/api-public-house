// routes imports
const { router, app } = require('./api.routes')

app.use('/api', router)

module.exports = app
