import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as express from 'express'
import { createSlackEventAdapter } from '@slack/events-api'
import * as bodyParser from 'body-parser'

const slackEvents = createSlackEventAdapter(functions.config().slack.verify_token)

const app = express()
const db = admin.firestore()

app.use(bodyParser.json())
app.use((req, res, next) => {
  const type = (req.body || { event: {} }).event.type
  console.log('event:type', type, req.body)
  next()
})
app.use('/events', slackEvents.expressMiddleware())

const messageKind = 'message'

function messageKey(message: any, channel?: string) {
  return `${message.channel || channel}_${message.user}_${message.ts}`
}

function handleMessage(event: any) {
  (async function () {
    let key, data
    if (event.subtype) {
      key = messageKey(event.message, event.channel)
      data = event.message
      data.edited = true
    } else {
      key = messageKey(event)
      data = event
    }
    await db.collection(messageKind).doc(key).set(data)
    console.log('save message', key)
  })().catch(err => {
    console.error('error save message', err)
  })
}

slackEvents.on('message', handleMessage)
slackEvents.on('error', console.error)

module.exports = app
