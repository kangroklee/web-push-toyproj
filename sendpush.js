const webpush = require("web-push");
require('dotenv').config();
const db = require('./db');

const keys = {
    publicKey: 'BMzr1JI7U2GVnJOQlfQlTGmnA8f7ADgUQi6N3muL-56PmVlmLk2Fm3BaR-epF5bB6o3Pm3GMarTVxOQPEx5EXUA',
    privateKey: process.env.PUSHSERVER_PRIVATEKEY
}

webpush.setVapidDetails(
    "mailto:emailme@example.com",
    keys.publicKey,
    keys.privateKey
);

async function getMyCroissant() {
    const myCreds = await db.getMine();
    const { endpoint, keys } = myCreds;
    const bomb = { endpoint, keys };
    try {
        webpush.sendNotification(bomb, "Hello World from Notification Server!");
    } catch(e) {
        // i want to add a timeout for like 5-10secs but I'm just too lazy 
        console.error(e, "oh shit something went wrong:/");
        return -1;
    }
}

getMyCroissant();
