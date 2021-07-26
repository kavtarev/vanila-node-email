const fs = require('fs')
const path = require('path')
const nodeMailer = require('nodemailer')
async function sendMaiL(options) {
  let transporter = nodeMailer.createTransport({
    service: 'Mail.ru',
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  })

  fs.readFile(
    path.join(__dirname, 'public', options.file),
    async (err, data) => {
      if (err) {
        console.log(err)
      }
      let info = await transporter.sendMail({
        from: process.env.MAIL,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: data,
        attachments: [
          {
            filename: 'your_submit.txt',
            contentType: 'text/plain',
            path: options.path,
          },
        ],
      })
    }
  )
}

module.exports = sendMaiL
