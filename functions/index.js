const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp(functions.config().firebase)

exports.slackApp = functions.https.onRequest(require('./slack'))
