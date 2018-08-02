import * as path from 'path'
import * as fs from 'fs'
import * as admin from 'firebase-admin'
import * as Yargs from 'yargs' // tslint-disable-line

import { newModel } from '../src/modelutil'
import { Channel } from '../src/channel'


admin.initializeApp({
  credential: admin.credential.applicationDefault()
})

const db = admin.firestore()

Yargs
  .command('channel [json]', 'import channels', yargs => {
    yargs.positional('json', {
      describe: 'channel json from slack export.'
    })
    return yargs
  }, (argv) => {
    if (!argv.json) {
      console.error('no json path')
      return 1
    }
    const jsonPath = path.resolve(__dirname, argv.json)
    const channels = JSON.parse(fs.readFileSync(jsonPath).toString('utf8'))
    console.log('channel size', channels.length)
    const tasks: Promise<any>[] = []
    let batch = db.batch()
    let count = 0
    for (const data of channels) {
      count += 1
      const c = newModel(Channel, data)
      const { ref, doc } = c.toDocument()
      batch.set(db.doc(ref), doc)

      if (count >= 500) {
        tasks.push(batch.commit())
        batch = db.batch()
        count = 0
      }
    }
    tasks.push(batch.commit())
    return Promise.all(tasks).catch(err => {
      console.error(err)
    })
  })
  .argv
