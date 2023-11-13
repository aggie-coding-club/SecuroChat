const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const { Pool } = require('pg');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Database pool connection
const pool = new Pool({
    host: process.env.DB_HOST, // Get from environment variables
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    ssl: {
        rejectUnauthorized: false
    }
});

// Create an HTTP server instance for the express app
const server = http.createServer(app);

// Initialize socket.io with the HTTP server instance
const io = socketIo(server, {
    cors: {
        // Restrict the origins allowed to connect for security.
        origin: ["frontenddomain.com", "otherapproveddomain.com"], // Change this to your frontend domain
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`client ${socket.id} connected`);

    socket.on('message', async (data) => {
        console.log(data);

        // Save the message to the database.
        try {
            await pool.query(
                'INSERT INTO messages (user_id, sender_id, message_text, timestamp, conversation_id) VALUES ($1, $2, $3, $4, $5)',
                [data.userId, data.senderId, data.messageText, new Date(), data.conversationId]
            );

            // Broadcasting the message to all connected clients after successful insertion.
            io.emit('message', data);
        } catch (error) {
            console.error('Error saving message to database:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log(`client ${socket.id} disconnected`);
    });
});

// Start the WebSocket server
server.listen(PORT, () => {
    console.log(`WebSocket Server is running on port ${PORT}`);
});
