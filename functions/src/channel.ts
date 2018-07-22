import { firestore } from 'firebase-admin'
import { ChannelCreatedEvent } from './slack_model'
import { model, key, toDocumentFrom } from './modelutil'

// Channel is slack channel model.
@model('channels')
export class Channel {
    @key id: string
    name: string
    created: Date
    creator?: string // user id
    is_archived?: boolean
    topic?: {
        value: string
        creator: string // user id
        last_set: Date
    }
    purepose?: {
        value: string
        creator: string // user id
        last_set: Date
    }

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
    getFromId(id: string): Promise<Channel>
    delete(id: string): Promise<void>
    addMember(id: string, userId: string): Promise<void>
    removeMember(id: string, userId: string): Promise<void>
}

export class FirestoreChannelRepository implements ChannelRepository {
    private db: firestore.Firestore
    constructor(db: firestore.Firestore) {
        this.db = db
    }

    private get collection() {
        return this.db.collection('channels')
    }

    private membersCollection(id: string) {
        return this.collection.doc(id).collection('members')
    }

    async save(channel: Channel): Promise<void> {
        const { ref, doc } = toDocumentFrom(channel)
        return await this.db.doc(ref).set(doc, { merge: true })
            .then(() => { return }) // TODO: add log
    }

    async getFromId(id: string): Promise<Channel> {
        const res = await this.collection.doc(id).get()
        return Object.assign(new Channel(), { id }, res.data())
    }

    async delete(id: string): Promise<void> {
        const snap = await this.membersCollection(id).get()
        const tasks: Array<Promise<any>> = []
        const batchSize = 500
        if (snap.size > 0) {
            let count = 0
            let batch = this.db.batch()
            snap.forEach(doc => {
                count += 1
                batch.delete(doc.ref)
                if (count >= batchSize) {
                    tasks.push(batch.commit())
                    batch = this.db.batch()
                    count = 0
                }
            })
            tasks.push(batch.commit())
        }
        tasks.push(this.collection.doc(id).delete())
        await Promise.all(tasks)
    }

    async addMember(id: string, userId: string): Promise<void> {
        const ref = this.db.collection('users').doc(userId)
        await this.membersCollection(id).doc(userId)
            .set({ ref })
    }

    async removeMember(id: string, userId: string): Promise<void> {
        await this.membersCollection(id).doc(userId).delete()
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

    async rename(id: string, name: string) {
        const c = await this.repo.getFromId(id)
        if (c.name === name) {
            throw new Error('No change channel name.')
        }
        c.name = name
        await this.repo.save(c)
    }

    async archive(id: string) {
        const c = await this.repo.getFromId(id)
        c.is_archived = true
        await this.repo.save(c)
    }

    async unarchive(id: string) {
        const c = await this.repo.getFromId(id)
        c.is_archived = false
        await this.repo.save(c)
    }

    async delete(id: string) {
        await this.repo.delete(id)
    }

    async join(id: string, userId: string) {
        await this.repo.addMember(id, userId)
    }

    async leave(id: string, userId: string) {
        await this.repo.removeMember(id, userId)
    }
}