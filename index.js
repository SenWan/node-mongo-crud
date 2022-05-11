const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.get(cors());
app.use(express.json());

// user == dbuser1
// password == ikPtaHxI02kKV7mO


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dbuser1:ikPtaHxI02kKV7mO@cluster0.5abec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const usersCollection = client.db('foodExpress').collection('user');
        const user = {name: 'SenWin', email: 'senwin@gmail.com'};
        const result = await usersCollection.insertOne(user);
        console.log(`user inserted with id: ${result.insertedId}`)
    }
    finally{
        //await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running My Node CRUD Server');
});

app.listen(port, () =>{
    console.log('CRUD server is running');
})