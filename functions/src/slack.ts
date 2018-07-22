import * as Debug from 'debug'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as express from 'express'
import { createSlackEventAdapter } from '@slack/events-api'
import * as bodyParser from 'body-parser'
import { asyncHandler } from './utils'
import { newMessageRepository } from './repository'
import { SlackEvent, SlackEventType, Message } from './model'
import { ChannelService, FirestoreChannelRepository, Channel } from './channel'

const debug = Debug('app:slack')

const slackEvents = createSlackEventAdapter(functions.config().slack.verify_token)

const db = admin.firestore()
const channelService = new ChannelService(new FirestoreChannelRepository(db))
const msgRepo = newMessageRepository(db)

async function handleMessage(event: SlackEvent) {
  debug('message', event)
  // await msgRepo.save(data)
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
  if (event.type !== SlackEventType.ChannelRename) {
    return
  }
  await channelService.rename(event.channel.id, event.channel.name)
}

async function handleChannelArchive(event: SlackEvent) {
  debug('handleChannelArchive', event)
  if (event.type !== SlackEventType.ChannelArchive) {
    return
  }
  channelService.archive(event.channel)
}

async function handleChannelUnarchive(event: SlackEvent) {
  debug('handleChannelUnarchive', event)
  if (event.type !== SlackEventType.ChannelUnarchive) {
    return
  }
  channelService.unarchive(event.channel)
}

async function handleChannelDeleted(event: SlackEvent) {
  debug('handleChannelDeleted', event)
  if (event.type !== SlackEventType.ChannelDeleted) {
    return
  }
  channelService.delete(event.channel)
}

slackEvents.on('channel_created', asyncHandler('handleCreateChannel', handleCreateChannel))
slackEvents.on('channel_rename', asyncHandler('handleRenameChannel', handleRenameChannel))
slackEvents.on('channel_archive', asyncHandler('handleChannelArchive', handleChannelArchive))
slackEvents.on('channel_unarchive', asyncHandler('handleChannelUnarchive', handleChannelUnarchive))
slackEvents.on('channel_deleted', asyncHandler('handleChannelDeleted', handleChannelDeleted))
slackEvents.on('message', asyncHandler('handleMessage', handleMessage))
slackEvents.on('error', console.error)

const app = express()
app.use(bodyParser.json())
app.use('/events', slackEvents.expressMiddleware())

module.exports = app
