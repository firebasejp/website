import * as firebase from 'firebase-admin'
import { Message } from './model'

export interface MessageRepository {
    save(Message): Promise<void>
}

const messageKind = 'Message'


export function newMessageRepository(db: firebase.firestore.Firestore): MessageRepository {
    return {
        save: async function (msg: Message) {
            const data = Object.assign({}, msg)
            delete data.id
            await db
                .collection(messageKind)
                .doc(msg.id)
                .set(data)
        }
    }
}