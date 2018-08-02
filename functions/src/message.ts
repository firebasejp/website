import { firestore } from 'firebase-admin'
import { model, key, toDocumentFrom } from './modelutil'

@model('/channel/{channelId}/messages')
export class Message {
    @key id: string
    channelId: string
}