# web-push-toyproj
Toy Project using Web Push for notifications and MongoDB Atlas as DB for saving subscriber info.

## Frontend

- index.html : client goes thru here
- client.js : sets service worker and creates web push subscription, sends JSON to backend
- worker.js : service worker file

## Backend

- index.js : express server that listens for requests (subscription)
- db.js : communicates with MongoDB Atlas DB, uses Mongoose
- subscriptionSchema.js : schema for checking web push subscription has correct format
- sendpush.js : sends Web Push Notification to target with Subscription details

## Changelog

- 2023-11-28: sendpush.js now reads from MongoDB Atlas for endpoint and creds to send notifications. \n Add saveUser(), getAllUsers(), getMine() (getMine only retrives document for single ObjectId) to API endpoint /subscribe, /allusers, /mine respectfully.