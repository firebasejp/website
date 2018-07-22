import * as Debug from 'debug'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as express from 'express'
import { createSlackEventAdapter } from '@slack/events-api'
import * as bodyParser from 'body-parser'
import { asyncHandler } from './utils'
import { newMessageRepository } from './repository'
import { SlackEvent, Message } from './model'
import { ChannelService, FirestoreChannelRepository, Channel } from './channel'

const debug = Debug('app:slack')

const slackEvents = createSlackEventAdapter(functions.config().slack.verify_token)

const db = admin.firestore()
const channelService = new ChannelService(new FirestoreChannelRepository(db))
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

async function handleCreateChannel(event: SlackEvent) {
  debug('handleCreateChannel', event)
  if (event.type !== 'channel_created') {
    return
  }
  const c = Channel.from(event)
  await channelService.save(c)
}

async function handleRenameChannel(event: SlackEvent) {
  debug('handleRenameChannel', event)
  if (event.type !== 'channel_rename') {
    return
  }
  const c = event.channel
  await channelService.rename(c.id, c.name)
}

slackEvents.on('channel_created', asyncHandler('handleCreateChannel', handleCreateChannel))
slackEvents.on('channel_rename', asyncHandler('handleRenameChannel', handleRenameChannel))
slackEvents.on('message', asyncHandler('handleMessage', handleMessage))
slackEvents.on('error', console.error)

const app = express()
app.use(bodyParser.json())
app.use('/events', slackEvents.expressMiddleware())

module.exports = app
