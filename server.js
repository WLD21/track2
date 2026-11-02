const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());

let victimsData = [];

app.get('/victims', (req, res) => {
    res.json(victimsData);
});

app.post('/victims', (req, res) => {
    const data = req.body;
    victimsData.push(data);
    io.emit('newVictim', data);
    res.status(201).send();
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
