const http = require('http')
const fs = require('fs')
const path = require('path')
const server = http.createServer((req, res) => {
  let url = req.url
  if (path.extname(req.url) === '.css') {
    fs.readFile('style.css', (err, data) => {
      if (err) {
        console.log(err)
        res.end('bullshit')
      }
      res.setHeader('Content-Type', 'text/css')
      res.statusCode = 203
      res.write(data)
      res.end()
    })
  }
  if (req.url === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        console.log(err)
        res.end('bullshit')
      }
      res.setHeader('Content-Type', 'text/html')
      res.statusCode = 202
      res.write(data)
      res.end()
    })
  }
})
server.listen(3000, () => {
  console.log('server is up onn')
})
