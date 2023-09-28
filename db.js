const mongoose = require('mongoose');
require('dotenv').config();

const subscriptionSchema = require('./subscriptionSchema');

const uri = process.env.MONGODB_ATLAS_URI;

async function main(userSubscriptionObj) {
    try {
        await mongoose.connect(uri);
        //compile model from schema
        const Subscription = mongoose.model('Subscription', subscriptionSchema); //.model(nameOfCollection, Schema)

        const user = new Subscription(userSubscriptionObj);

        //save to DB
        await user.save();

        //if connection to DB and saving to DB is OK:
        return 0;

    } catch(e) {
        console.error(e);
    }
}

// async function main() {
//     await mongoose.connect(uri);
//     //compile model from schema
//     const Subscription = mongoose.model('Subscription', subscriptionSchema); //.model(nameOfCollection, Schema)

//     const user1 = new Subscription({
//         "endpoint": "https://example.com/push/endpoint",
//         "keys": {
//             "p256dh": "your-public-key",
//             "auth": "your-auth-secret"
//         }
//     })
//     console.log("user1:", user1);

//     //save to DB
//     await user1.save();
// }
// main().catch(err => console.error(err))

module.exports = main;