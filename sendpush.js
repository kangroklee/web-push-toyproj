const webpush = require("web-push");
require('dotenv').config();


const keys = {
    publicKey: 'BMzr1JI7U2GVnJOQlfQlTGmnA8f7ADgUQi6N3muL-56PmVlmLk2Fm3BaR-epF5bB6o3Pm3GMarTVxOQPEx5EXUA',
    privateKey: process.env.PUSHSERVER_PRIVATEKEY
  }

webpush.setVapidDetails(
    "mailto:emailme@example.com",
    keys.publicKey,
    keys.privateKey
);

webpush.sendNotification(
    process.env.SUBSCRIBER_INFO, //ideally this won't be in a .env but this is a PoC
    "Hello World from Notifiication Server!"//payload goes here
)