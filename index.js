
const childProcess = require('child_process')
const http = require('http')
const path = require('path')

const express = require('express')

// create express application with static middleware for `static` folder
const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))

// create HTTP server listening on given or default port
const server = http.createServer(app)
const port = process.env.PORT - 0 || 3000

// start HTTP server
server.listen(port, () => {
  console.log(`HTTP Server listening on http://0.0.0.0:${port}`)

  // open default browser pointing to running HTTP server
  const start =
    (process.platform === 'darwin'? 'open' : ((process.platform === 'win32') ? 'start' : 'xdg-open'))
  childProcess.exec(`${start} http://0.0.0.0:${port}`)
})
