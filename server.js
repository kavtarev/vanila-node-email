require('dotenv').config()
const http = require('http')
const fs = require('fs')
const path = require('path')
const sendMail = require('./mail')
const formidable = require('formidable')

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
    if (req.url === '/api/file') {
      let form = formidable.IncomingForm()
      form.parse(req, function (err, fields, files) {
        if (err) {
          console.log(err)
        }

        let oldpath = files.textFile.name ? files.textFile.path : ''
        let newpath = path.join(__dirname, 'files', files.textFile.name)

        if (oldpath) {
          fs.rename(oldpath, newpath, function (err) {
            if (err) throw err
            const options = {
              to: fields.email,
              subject: 'new theme ?',
              text: 'how u doin?',
              file: 'error.html',
              path: newpath,
            }
            sendMail(options).catch(console.error)
            res.end(JSON.stringify({ localion: 'all good' }))
          })
        } else {
          res.end(JSON.stringify({ message: 'net tela net dela' }))
        }
      })
    }
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
