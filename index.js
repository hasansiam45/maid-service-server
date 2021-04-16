const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pqklg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})




const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect(err => {
    const serviceCollection = client.db("maidService").collection("services");
       
        app.get('/services', (req, res) => {
            serviceCollection.find()
                .toArray((err, services) => {
                    res.send(services)
                })
        })
    
       
        app.post('/addServices', (req, res) => {
            const newService = req.body;
            console.log(newService)
            serviceCollection.insertOne(newService)
                .then(result => {

                    res.send(result.insertedCount > 0)
                })
        })
    // perform actions on the collection object
    // client.close();
});









app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


