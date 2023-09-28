const express = require('express');
const cors = require('cors');
const main = require('./db');
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
        const sendDBResult = await main(req.body);
        if(sendDBResult === 0) {
            res.status(201).send('Subscription details successfully saved to DB');
        }
    } catch(e) {
        console.error(e);
        res.status(500).send('Error passing request to DB');
        return;
    }
    
})

//define a route that listens to requests
app.listen(PORT, () => {
    console.log("Server listening on PORT:", PORT);
})