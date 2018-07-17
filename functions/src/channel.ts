import { firestore } from 'firebase-admin'
import { ChannelCreatedEvent } from './model'
import { model, key, toDocumentFrom } from './modelutil'

// Channel is slack channel model.
@model
export class Channel {
    @key id: string
    name: string
    created: Date
    creator: string // user id
    is_archived: boolean
    topic: {
        value: string
        creator: string // user id
        last_set: Date
    }
    purepose: {
        value: string
        creator: string // user id
        last_set: Date
    }
    members: string[]

    static from(data: ChannelCreatedEvent): Channel {
        const c = new Channel()
        c.id = data.channel.id
        c.name = data.channel.name
        c.created = new Date(data.channel.created * 1000)
        c.creator = data.channel.creator
        c.is_archived = false
        return c
    }
}

export interface ChannelRepository {
    save(channel: Channel): Promise<void>
}

export class FirestoreChannelRepository implements ChannelRepository {
    private db: firestore.Firestore
    constructor(db: firestore.Firestore) {
        this.db = db
    }

    private get collection() {
        return this.db.collection('Channels')
    }

    async save(channel: Channel): Promise<void> {
        const { key, doc } = toDocumentFrom(channel)
        return await this.collection.doc(key).set(doc)
            .then(() => { return }) // TODO: add log
    }

}

export class ChannelService {
    private repo: ChannelRepository
    constructor(repo: ChannelRepository) {
        this.repo = repo
    }

    async save(channel: Channel) {
        if (!channel.id) {
            throw new Error('Channel ID is empty')
        }
        await this.repo.save(channel)
    }
}