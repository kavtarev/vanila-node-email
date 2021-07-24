const fs = require('fs')
const path = require('path')

const link = path.join(__dirname, 'public', 'jo.html')

fs.readFile(link, (err, data) => {
  if (err) console.log(err)
  console.log(data)
})
