const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let timer = 30;
let lastResult = 'GREEN';

setInterval(() => {
    timer--;
    if (timer < 0) {
        timer = 30;
        const colors = ['RED', 'GREEN', 'VIOLET'];
        lastResult = colors[Math.floor(Math.random() * colors.length)];
    }
    io.emit('gameUpdate', { timer, lastResult });
}, 1000);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

