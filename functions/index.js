const functions = require('firebase-functions')
const cors = require('cors')({origin: true})
const algoliasearch = require('algoliasearch');
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_INDEX_NAME = 'users';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

exports.onUsersNameUpdated = functions.firestore.document('usersName/{userDocId}').onWrite((snap, context) => {
  const user = snap.after.data();
  user.objectID = context.params.userDocId;
  const index = client.initIndex(ALGOLIA_INDEX_NAME);
  return index.saveObject(user);
});

exports.sendNotificationEmail = functions.https.onRequest((request, response) => {
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

exports.getDNIData = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.sendStatus(200)

    var req = require('request');
    var options = {
      'method': 'GET',
      'url': 'https://zxing.org/w/decode?u=https%3A%2F%2Flh3.googleusercontent.com%2FlvTM4-qWuGmu-5ya59DsSiQdsUQRQWSVppJvDQHCkNgP2phfnHpnePLR6d2-hyKDysqS89oWA-pjTVATgxrUHMc6s3tlw2oX1ttQhsFAjXkJStdXD3zfDjwbbuwlvtqhgbEvWAqjFfmRr-XNUXs5slIAC92Issf1xZ3Xpro-v8UqAbUcSQS7L-7HUvQ4FKPUFB4LZLwUcor-pmUpBPx6YDnVZlgexmz95ImhmuOcIAAfy1f-9J7JPGD5YfwIlkLfLOnmEfL6jHox261aFZk0irezMA7RimANA59x2RGhnJ33RFfg0qaPTGgTuHwx0DadWn7XLaKKQFVNogd12wh61xsYGIvpGTSMGtXZO6TzgUU37zqbt4ua1nGafhI5sATW0gQJxCx0UOdKoqigoQzr987QZtOwYfUC9JZImGsD8oty5Rs3PUdIdTCFKrmzlBQbl7HX1g4LvLEw6UiR7tOjy1Kln_mI1AaUMYEIdI7CVAvTNrzd5GKmXc58E98XHkMS3Yyp2G-mazCCKWnmRISNqh0qWdvBytTDim5afsfZHGInAEVUhaaZicWDWF9UcbxpmhfvNellHzqKDoj1kHfxSrYftS-twup5GGjGmoTDeenLs12fNe6ukSK0hdxVxXxKtQb4QtdY61Bt8VGy5F0y6SG6ndHdp58dlHZFZF5jI1oa-qZbal8ReZ_2GPBuGdL2dgBO__sUvXdHk518if2jDhIKlijq2ocEcatYIP6R5ZHnRcoX0fg-naM%3Dw826-h526-no',
      'headers': {
      }
    };
    req(options, (error, res) => { 
      if (error) throw new Error(error);
      console.log(res.body);
    });
  })
})