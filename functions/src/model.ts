
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

export type SlackEvent =
    TextMessageEvent &
    EditTextMessageEvent &
    ChannelCreatedEvent & 
    ChannelRenameEvent

// MessageEvent is event model
export type MessageEvent = {
    type: 'message'
    user?: string
    bot_id?: string
    client_msg_id: string
    ts: string
    channel: string
    event_ts: string
    channel_type: string
}

export type TextMessageEvent = {
    text: string
} & MessageEvent

type Edited = {
    edited: {
        user: string
        ts: string
    }
}

export type EditTextMessageEvent = {
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
    type: 'channel_created'
    channel: Channel & {
        creator: string
        is_shared: boolean
        is_org_shared: boolean
    }
}

export type ChannelRenameEvent = {
    type: 'channel_rename'
    channel: Channel
}