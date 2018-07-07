import * as firebase from 'firebase-admin'
import { Event } from './model'

export interface EventRepository {
    save(event: Event): Promise<void>
}

const eventKind = 'Event'


export function newEventRepository(db: firebase.firestore.Firestore): EventRepository {
    return {
        save: async function (event: Event) {
            const data = Object.assign({}, event)
            delete data.id
            await db
                .collection(eventKind)
                .doc(event.id)
                .set(data)
        }
    }
}