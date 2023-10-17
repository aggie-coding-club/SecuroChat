// server/index.js
const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Create an HTTP server instance for the express app
const server = http.createServer(app);

// Initialize socket.io with the HTTP server instance
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');

    // Handle custom events or messages here
    socket.on('message', (data) => {
        console.log(data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the WebSocket server
server.listen(PORT, () => {
    console.log(`WebSocket Server is running on port ${PORT}`);
});
