import * as Debug from 'debug'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as express from 'express'
import { createSlackEventAdapter } from '@slack/events-api'
import * as bodyParser from 'body-parser'
import { asyncHandler } from './utils'
import { newMessageRepository } from './repository'
import { SlackEvent, Message } from './model'

const debug = Debug('app:slack')

const slackEvents = createSlackEventAdapter(functions.config().slack.verify_token)

const db = admin.firestore()
const msgRepo = newMessageRepository(db)

function messageKey(event: SlackEvent) {
  return `${event.channel}_${event.ts}`
}

function messageData(event: SlackEvent): Message {
  const m: Message = {
    id: messageKey(event),
    user: event.user || event.bot_id,
    channel: event.channel,
    raw: JSON.stringify(event),
    ts: Number.parseFloat(event.ts)
  }
  return m
}

async function handleMessage(event: SlackEvent) {
  const data = messageData(event)
  debug('message', event, data)
  await msgRepo.save(data)
}

slackEvents.on('message', asyncHandler('handleMessage', handleMessage))
slackEvents.on('error', console.error)

const app = express()
app.use(bodyParser.json())
app.use('/events', slackEvents.expressMiddleware())

module.exports = app
