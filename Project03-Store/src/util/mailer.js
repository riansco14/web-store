const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7ffed140ca20fc",
      pass: "2bd77e687cca22"
    }
  })