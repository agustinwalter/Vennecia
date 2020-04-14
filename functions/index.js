const functions = require('firebase-functions')

exports.sendNotificationEmail = functions.https.onRequest((request, response) => {
  const cors = require('cors')({origin: true})
  cors(request, response, () => {
    response.sendStatus(200)
    const mailgun = require("mailgun-js")
    const mg = mailgun({
      apiKey: 'e28f9abc70961c15d26a12d5d463388b-73ae490d-3b38f93c', 
      domain: 'sandboxf870e01660854c60b39f0b7782a27afb.mailgun.org'
    })
    const data = {
      from: 'Agustín Walter <agustin@vennecia.com>',
      to: 'agustin.walter98@gmail.com',
      subject: 'Validá esta identidad',
      text: `Hola Agustín, una nueva persona se ha registrado. Validá su identidad para que pueda comprar entradas:\n\nhttps://vennecia.com/admin?userId=${request.query.userId}`
    }
    mg.messages().send(data, (error, body) => {
      console.log(`Email de validación para ${request.query.userId} enviado`)
    })
  });
})