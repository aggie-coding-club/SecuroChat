/* index.js
 * Serves as entry point to the backend
 * Responsible for settting up the express server
 * Intializes websocket server through Socket.io
 * Establishes connection to postgresql database
 * Responsible for configuring/setting up middleware
 * Defines API routes and websocket event handling
*/

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const db = require('./database');
const authRoutes = require('./src/routes/authRoutes');
// const messageRoutes = require('./src/routes/messageRoutes');
// const userRoutes = require('./src/routes/userRoutes');
// const chatSocket = require('./src/sockets/chatSocket');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3001', // Adjust this based on your frontend's URL
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3001;

// Database connection
db.connect();


// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
// app.use('/message', messageRoutes);
// app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send(`Hello! Welcome to SecuroChat Server!`);
})

// Socket.IO
io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
  
    // Pass the socket and pool to the socket handler
     // chatSocket(socket, pool);
  
    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
  
  // Start the server
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
