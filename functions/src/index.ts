import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp(functions.config().firebase)

exports.slackApp = functions.https.onRequest(require('./slack'))