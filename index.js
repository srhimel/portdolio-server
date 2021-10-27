const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors')

const app = express();
const port = process.end.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const ObjectId = require('mongodb').ObjectId;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pt0xz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("srHimel");
        const servicesCollection = database.collection("service");
        // post api 
        app.post('/services', async (req, res) => {
            const service = req.body;
            const result = await servicesCollection.insertOne(service);
            res.json(result);
        })

        //get api

        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({})
            const result = await cursor.toArray();
            res.send(result);
        })
    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World')
});

app.listen(port);