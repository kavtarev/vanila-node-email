require('dotenv').config()
const http = require('http')
const fs = require('fs')
const path = require('path')
const PORT = process.env.PORT || 4000
const server = http.createServer((req, res) => {
  let headerType
  let fileName = req.url !== '/' ? req.url : 'index.html'
  if (!path.extname(fileName)) {
    fileName += '.html'
  }
  switch (path.extname(req.url)) {
    case '.css':
      headerType = 'text/css'
      break
    case '.js':
      headerType = 'text/javascript'
      break
    default:
      headerType = 'text/html'
  }

  if (req.method === 'POST') {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
      if (body.length > 1e6) {
        req.socket.destroy()
      }
    })
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(body))
    })
  }
  if (req.method === 'GET') {
    fs.readFile(path.join(__dirname, 'public', fileName), (err, data) => {
      if (err) {
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) => {
          if (err) {
            res.writeHead(500)
            return res.end('something went wrong')
          } else {
            res.writeHead(404, { 'Content-Type': 'text/html' })
            res.end(data)
          }
        })
      } else {
        res.writeHead(200, { 'Content-type': headerType })
        res.end(data)
      }
    })
  }
})
server.listen(PORT, () => {
  console.log(`server is up on port: ${PORT}`)
})
