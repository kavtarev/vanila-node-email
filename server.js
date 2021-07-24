const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  let header
  switch (path.extname(req.url)) {
    case '.css':
      header = { 'Content-Type': 'text/css' }
      break
    case '.js':
      header = { 'Content-Type': 'text/javascript' }
      break
    default:
      header = { 'Content-Type': 'text/html' }
      break
  }

  let fileName = req.url === '/' ? 'index.html' : req.url

  if (!path.extname(fileName)) {
    fileName += '.html'
  }

  const forbiden = ['/error', '/404']
  if (forbiden.includes(req.url)) {
    fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) => {
      if (err) {
        res.writeHead(500)
        res.end('erroor')
      } else {
        res.writeHead(404, header)
        res.end(data)
      }
    })
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
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ body }))
      return
    })
  }
  fs.readFile(path.join(__dirname, 'public', fileName), (err, data) => {
    if (err) {
      fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) => {
        if (err) {
          res.writeHead(500)
          res.end('erroor')
        } else {
          res.writeHead(404, header)
          res.end(data)
        }
      })
    } else {
      res.writeHead(200, header)
      res.end(data)
    }
  })
})
server.listen(3000, () => {
  console.log('server is up onn')
})
