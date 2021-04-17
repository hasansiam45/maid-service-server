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
    const reviewCollection = client.db("maidService").collection("reviews");
    const bookingCollection = client.db("maidService").collection("bookings");


       
        app.get('/services', (req, res) => {
            serviceCollection.find()
                .toArray((err, services) => {
                    res.send(services)
                })
        })

 
        app.get('/reviews', (req, res) => {
            reviewCollection.find()
                .toArray((err, reviews) => {
                  
                    res.send(reviews)
                })
        })
    
        app.get('/bookings', (req, res) => {

            bookingCollection.find({
                    email: req.query.email
                })
                .toArray((err, documents) => {
                    res.send(documents)
                })
        })
    
        app.get('/allBookings', (req, res) => {

            bookingCollection.find()
                .toArray((err, documents) => {
                    res.send(documents)
                })
        })
    
       
        app.post('/addServices', (req, res) => {
            const newService = req.body;
            
            serviceCollection.insertOne(newService)
                .then(result => {

                    res.send(result.insertedCount > 0)
                })
        })



        app.post('/addReviews', (req, res) => {
            const newReview = req.body;
        
            reviewCollection.insertOne(newReview)
                .then(result => {

                    res.send(result.insertedCount > 0)
                })
        })

    app.post('/addBooking', (req, res) => {
        const booking = req.body;

        bookingCollection.insertOne(booking)
            .then(result => {

                res.send(result.insertedCount > 0)
            })
    })



       app.delete('/delete/:id', (req, res) => {
           const id = ObjectId(req.params.id)
           console.log(id)
           serviceCollection.deleteOne({
                   _id: id
               })
               .then(result => {
                   console.log(result)
               }).catch(err => console.error(`Delete failed with error: ${err}`))
       })
    // perform actions on the collection object
    // client.close();
});









app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


