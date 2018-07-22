// Message is db model
export type Message = {
    id: string
    user: string
    channel: string
    raw: string
    ts: number
}

export type TextMessage = {
    text: string
} & Message

export enum SlackEventType {
    Message = 'message',
    ChannelCreated = 'channel_created',
    ChannelRename = 'channel_rename',
    ChannelArchive = 'channel_archive',
    ChannelUnarchive = 'channel_unarchive',
    ChannelDeleted = 'channel_deleted'
}

export type SlackEvent =
    TextMessageEvent |
    EditTextMessageEvent |
    ChannelCreatedEvent |
    ChannelRenameEvent |
    ChannelArchiveEvent |
    ChannelUnarchiveEvent |
    ChannelDeletedEvent

// MessageEvent is event model
export type MessageEvent = {
    type: SlackEventType.Message
    user?: string
    bot_id?: string
    client_msg_id: string
    ts: string
    channel: string
    event_ts: string
    channel_type: string
}

export type TextMessageEvent = MessageEvent & {
    type: SlackEventType.Message
    text: string
}

type Edited = {
    edited: {
        user: string
        ts: string
    }
}

export type EditTextMessageEvent = {
    type: SlackEventType.Message
    message: TextMessageEvent & Edited
}

export type Channel = {
    id: string
    is_channel: boolean
    name: string
    name_normalized: string
    created: number
}

export type ChannelCreatedEvent = {
    type: SlackEventType.ChannelCreated
    channel: Channel & {
        creator: string
        is_shared: boolean
        is_org_shared: boolean
    }
}

export type ChannelRenameEvent = {
    type: SlackEventType.ChannelRename
    channel: Channel
}

export type ChannelArchiveEvent = {
    type: SlackEventType.ChannelArchive
    channel: string // channel id
    user: string
}

export type ChannelUnarchiveEvent = {
    type: SlackEventType.ChannelUnarchive
    channel: string // channel id
    user: string
}

export type ChannelDeletedEvent = {
    type: SlackEventType.ChannelDeleted
    channel: string // channel id
}