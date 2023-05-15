require('dotenv').config();
const connectDB = require('./db/connect');
const express = require('express');
const http = require('http');
const routes = require('./routes/index');
const port = 3000;

const app = express();
app.use(express.json());

const server = http.createServer(app);

app.use('/', routes);
// Routes
app.get('/', (req, res) => {
    res.send("Hello world");
})


const start = async () => {
    try {

        await connectDB(process.env.MONGO_URI);
        server.listen(port, () => console.log(`server is up and running on port ${port}`));
    } catch (err) {
        console.log(err);
    }
}

start();
