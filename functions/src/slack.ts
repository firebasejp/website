import * as Debug from 'debug'
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as express from 'express'
import { createSlackEventAdapter } from '@slack/events-api'
import * as bodyParser from 'body-parser'
import { asyncHandler } from './utils'
import { SlackEvent, SlackEventType, Message, SlackMessageSubType } from './model'
import { ChannelService, FirestoreChannelRepository, Channel } from './channel'

const debug = Debug('app:slack')

const slackEvents = createSlackEventAdapter(functions.config().slack.verify_token)

const db = admin.firestore()
const channelService = new ChannelService(new FirestoreChannelRepository(db))

async function handleMessage(event: SlackEvent) {
  debug('handleMessage', event)
  if (event.type !== SlackEventType.Message) {
    return
  }

  const tasks: Array<Promise<any>> = []

  switch (event.subtype) {
    case SlackMessageSubType.ChannelJoin:
      tasks.push(channelService.join(event.channel, event.user))
      break
    default:
    // TODO: save message
  }

  await Promise.all(tasks)
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

async function handleChannelLeft(event: SlackEvent) {
  if (event.type !== SlackEventType.ChannelLeft) {
    return
  }
  channelService.leave(event.channel, event.actor_id)
}

slackEvents.on('channel_created', asyncHandler('handleCreateChannel', handleCreateChannel))
slackEvents.on('channel_rename', asyncHandler('handleRenameChannel', handleRenameChannel))
slackEvents.on('channel_archive', asyncHandler('handleChannelArchive', handleChannelArchive))
slackEvents.on('channel_unarchive', asyncHandler('handleChannelUnarchive', handleChannelUnarchive))
slackEvents.on('channel_deleted', asyncHandler('handleChannelDeleted', handleChannelDeleted))
slackEvents.on('channel_left', asyncHandler('handleChannelLeft', handleChannelLeft))
slackEvents.on('message', asyncHandler('handleMessage', handleMessage))
slackEvents.on('error', console.error)

const app = express()
app.use(bodyParser.json())
app.use('/events', slackEvents.expressMiddleware())

module.exports = app
