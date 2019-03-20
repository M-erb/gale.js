// Get env variables
require('dotenv').config({
  path: './.env'
})

const path = require('path')
const express = require('express')
const app = express()
const nunjucks = require('./nunjucks.config')()
const builder = require('./builder')
const destinationFolder = './public'

nunjucks.express(app)
app.set('view engine', 'njk')

// Build static file the nmove on to deliver the file
app.get('/*', async (req, res, next) => {
  // Exclude anything that has a '.' as this is most likely a file asset
  if (req.url.indexOf('.') >= 0) next()
  else {
    try {
      const result = await builder.html(req.url, destinationFolder)
      next()
    } catch (error) {
      if (error.info.message.includes('template not found')) res.status(404).render('404', {})
      else res.status(500).render('template-error', { path: req.path, error: err })
    }
  }
})

// Deliver static files
app.use(express.static(path.join(__dirname, '/public')))

function serverStarted() {
  const serverPort = this.address().port
  process.env.PORT = serverPort
  console.log(`visit: http://localhost:${serverPort}`)
  if (process.env.HOST) console.log(`visit: http://${process.env.HOST}`)

  // to display local networks to test on other devices
  require('./helpers/logip')(serverPort)
}

// Start server
const port = process.env.PORT
try {
  app.listen(port, serverStarted)
} catch (error) {
  console.log('Error in starting dev server: ', error)
  console.log('Common issue: Port is already in use')
}
