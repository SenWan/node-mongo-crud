const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

// user == dbuser1
// password == ikPtaHxI02kKV7mO


const { MongoClient, ServerApiVersion } = require('mongodb');
const { query } = require('express');
const uri = "mongodb+srv://dbuser1:ikPtaHxI02kKV7mO@cluster0.5abec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const usersCollection = client.db('foodExpress').collection('user');
        
        // get user
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = usersCollection.find(query);
            const users = await cursor.toArray();
            res.send(users)
    });

        // post user : add a new user
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            const result = await  usersCollection.insertOne(newUser);

            res.send(result);
        });
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