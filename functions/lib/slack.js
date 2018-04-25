"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const events_api_1 = require("@slack/events-api");
const bodyParser = require("body-parser");
const slackEvents = events_api_1.createSlackEventAdapter(functions.config().slack.verify_token);
const app = express();
const db = admin.firestore();
app.use(bodyParser.json());
app.use((req, res, next) => {
    const type = (req.body || { event: {} }).event.type;
    console.log('event:type', type, req.body);
    next();
});
app.use('/events', slackEvents.expressMiddleware());
const messageKind = 'message';
function messageKey(message, channel) {
    return `${message.channel || channel}_${message.user}_${message.ts}`;
}
function handleMessage(event) {
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            let key, data;
            if (event.subtype) {
                key = messageKey(event.message, event.channel);
                data = event.message;
                data.edited = true;
            }
            else {
                key = messageKey(event);
                data = event;
            }
            yield db.collection(messageKind).doc(key).set(data);
            console.log('save message', key);
        });
    })().catch(err => {
        console.error('error save message', err);
    });
}
slackEvents.on('message', handleMessage);
slackEvents.on('error', console.error);
module.exports = app;
//# sourceMappingURL=slack.js.map