const admin = require('firebase-admin')
const functions = require('firebase-functions')
const express = require('express')
const createSlackEventAdapter = require('@slack/events-api').createSlackEventAdapter
const slackEvents = createSlackEventAdapter(functions.config().slack.verify_token)

const app = express()
const db = admin.firestore()

app.use(require('body-parser').json())
app.use((req, res, next) => {
  const type = (req.body || {event: {}}).event.type
  console.log('event:type', type)
  next()
})
app.use('/events', slackEvents.expressMiddleware())

const messageKind = 'message'

function messageKey (message, channel) {
  return `${message.channel || channel}_${message.user}_${message.ts}`
}
function handleMessage (event) {
  (async () => {
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
