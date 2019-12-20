const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);
const fs = require('fs');

const socketIO = require('socket.io');
const io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('new-message', (message) => {
        io.emit('new-message', message);
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});