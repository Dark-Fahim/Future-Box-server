const express = require('express')
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000
require('dotenv').config()
// Middleware
app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.b0w0dwa.mongodb.net/?appName=Cluster0`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        const db = client.db('futureboxDB')
        const eventsCollection = db.collection('events')
        const joinedEventsCollection = db.collection('joined-events')


        // events related apis
        app.post('/events', async (req, res) => {
            console.log(req.body);
            const newEvent = req.body
            const result = await eventsCollection.insertOne(newEvent)
            res.send(result)
        })

        app.get('/events', async (req, res) => {
            const cursor = eventsCollection.find().sort({ date: 1 })
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/events/:id', async (req, res) => {
            const id = req.params.id
            const query = {_id: new ObjectId(id)}
            const result = await eventsCollection.findOne(query)
            res.send(result)
        })


        // joined related apis
        app.post('/joined-events', async (req, res) => {
            const newJoinedEvent = req.body
            const result = await joinedEventsCollection.insertOne(newJoinedEvent)
            res.send(result)
        })

        app.get('/joined-events', async (req, res) => {
            const email = req.query.email
            const query = {}
            if(email){
                query.joinerEmail = email
            }
            const cursor = joinedEventsCollection.find(query).sort({date: 1})
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/manage-events', async (req, res) => {
            const email = req.query.email
            const query = {}
            if(email){
                query.creatorEmail = email
            }
            const cursor = eventsCollection.find(query).sort({date: 1})
            const result = await cursor.toArray()
            res.send(result)
        })

        // Update events related apis
        app.patch('/manage-events/:id', async (req, res) => {
            const id = req.params.id
            const query = {_id: new ObjectId(id)}
            const updatedData = req.body
            const update = {
                $set: updatedData
            }
            const options = {}
            const result = await eventsCollection.updateOne(query, update, options)
            res.send(result)
        })




        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }



    finally {
        // Ensures that the client will close when you finish/error

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Server is running")
})


app.listen(port, () => {
    console.log('Server is Running on port . ', port);
})

