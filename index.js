require('dotenv').config();
const connectDB = require('./db/connect');
const express = require('express');
const http = require('http');
const auth = require('./routes/auth')
const signup = require('./routes/signup');
const port = 3000;

const app = express();
app.use(express.json());

const server = http.createServer(app);

// Routes

app.get('/', (req, res) => {
    res.send("Hello this is the homepage");
})

app.use('/auth', auth);
app.use('/signup', signup);

const start = async () => {
    try {

        await connectDB(process.env.MONGO_URI);
        server.listen(port, () => console.log(`server is up and running on port ${port}`));
    } catch (err) {
        console.log(err);
    }
}

start();
