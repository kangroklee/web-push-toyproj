const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

//parse requests with JSON payloads
app.use(cors({ origin: "*" }));
app.use(express.json());
//config
const PORT = process.env.PORT || 3000;

//define endpoint(s)
app.post('/subscribe', async (req, res) => {
    const subscriptionData = req.body;
    if (!subscriptionData) {
        return res.status(400).json({ error: 'Empty JSON' });
    }

    try {
        const sendDBResult = await db.saveUser(req.body);
        if(sendDBResult === 0) {
            res.status(201).send('Subscription details successfully saved to DB');
        }
    } catch(e) {
        console.error(e);
        res.status(500).send('Error passing request to DB');
        return;
    }  
})

app.get('/allusers', async(req, res) => {
    try {
        const userList = await db.getAllUsers();
        res.status(200).json( { msg: "Successfully got'em", userList});
    } catch(e) {
        console.error(e);
        res.status(500).send('Error getting all users');
        return;
    }
})

app.get('/mine', async(req, res) => {
    try {
        const mySub = await db.getMine();
        res.status(200).json( { msg: "Successfully got mine", mySub });
    } catch(e) {
        console.error(e);
        res.status(500).send('Error getting');
        return;
    }
})

//define a route that listens to requests
app.listen(PORT, () => {
    console.log("Server listening on PORT:", PORT);
})