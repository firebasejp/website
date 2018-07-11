
// Event is db model
export type Event = { 
    id: string
    channel: string
    raw: string
    ts: number
}

export type TextEvent = {
    text: string
} & Event

export type SlackEvent = 
    TextMessageEvent &
    EditTextMessageEvent

// MessageEvent is event model
export type MessageEvent = {
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