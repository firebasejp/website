const functions = require('firebase-functions')

exports.joinCommyunity = functions.https.onRequest((req, res) => {
  res.send('Hello from Firebase!')
})
