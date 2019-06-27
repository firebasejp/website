import firebase from 'firebase/app'
import 'firebase/performance'
import FirebaseConfig from './firebase-config.json'

const app = firebase.initializeApp(FirebaseConfig)

const perf = firebase.performance()

export default {
  app,
  perf
}
