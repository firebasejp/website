import * as Debug from 'debug'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as express from 'express'
import { createSlackEventAdapter } from '@slack/events-api'
import * as bodyParser from 'body-parser'
import { asyncHandler } from './utils'
import { newEventRepository } from './repository'
import { SlackEvent, Event } from './model'

const debug = Debug('app:slack')

const slackEvents = createSlackEventAdapter(functions.config().slack.verify_token)

const db = admin.firestore()
const eventRepo = newEventRepository(db)

function eventKey(event: SlackEvent) {
  return `${event.channel}_${event.ts}`
}

function eventData(event: SlackEvent): Event {
  const e: Event = {
    id: eventKey(event),
    channel: event.channel,
    raw: JSON.stringify(event),
    ts: Number.parseFloat(event.ts)
  }
  return e
}

async function handleMessage(event: SlackEvent) {
  const data = eventData(event)
  debug('event', event, data)
  await eventRepo.save(data)
}

slackEvents.on('message', asyncHandler('handleMessage', handleMessage))
slackEvents.on('error', console.error)

const app = express()
app.use(bodyParser.json())
app.use('/events', slackEvents.expressMiddleware())

module.exports = app
