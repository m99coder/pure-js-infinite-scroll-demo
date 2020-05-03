
const childProcess = require('child_process')
const http = require('http')
const path = require('path')

const express = require('express')

// configuration of port number and number of total items to provide
const port = process.env.PORT - 0 || 3000
const total = process.env.TOTAL - 0 || 30

// create express application
const app = express()

// interfere request for `config.js` and return it, otherwise proceed
app.use('/', (req, res, next) => {
  if (req.path === '/config.js') {
    return res.send(`const config = {port: ${port}, total: ${total}}`).end()
  }
  next()
})

// static middleware for `static` folder
app.use('/', express.static(path.join(__dirname, 'static')))

// mocked API endpoint
app.get('/api/next', (req, res) => {
  const current = req.query.current - 0 || 1
  const items = [...Array(3).keys()].map(num => current + num)
  res.json(items)
})

// create HTTP server listening on given or default port
const server = http.createServer(app)

// start HTTP server
server.listen(port, () => {
  console.log(`HTTP Server listening on http://0.0.0.0:${port}`)

  // open default browser pointing to running HTTP server
  const start =
    (process.platform === 'darwin'? 'open' : ((process.platform === 'win32') ? 'start' : 'xdg-open'))
  childProcess.exec(`${start} http://0.0.0.0:${port}`)
})
