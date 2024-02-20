require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5500;
const { MongoClient, ServerApiVersion } = require('mongodb');

// set the view engine to ejs
let path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// use res.render to load up an ejs view file

let myTypeServer = "9️⃣ The Peacemaker ✌🏻";



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.URI, {
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
    // Send a ping to confirm a successful connection
    const result = await client.db("papa-database").collection("papa-collection").find().toArray();


      console.log("papadatabase:", result);
      console.log("Pinged your deployment. You successfully connected to MongoDB!");

      return result;

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



app.get('/read', async (req, res) => {

    let myResultServer = await run();

    console.log("myResultServer:", myResultServer);

    res.render('index', {
     myTypeClient: myResultServer, 
     myResultClient: myResultServer

  });
  
});


app.get('/send', function (req, res) {
  
    res.send('Hello World from Express <br><a href="/">home</a>')
})

// app.listen(3000)

app.listen(port, () => {
  console.log(`nov app listening on port ${port}`)
})
