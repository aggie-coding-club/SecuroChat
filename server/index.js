/* index.js
 * Serves as entry point to the backend
 * Responsible for settting up the express server
 * Intializes websocket server through Socket.io
 * Establishes connection to postgresql database
 * Responsible for configuring/setting up middleware
 * Defines API routes and websocket event handling
 */
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const database = require("./database.js"); // Ensure this is the correct path to your database module
const authRoutes = require("./src/routes/authRoutes");
const messageRoutes = require("./src/routes/messageRoutes");
const userRoutes = require("./src/routes/userRoutes");
const conversationRoutes = require("./src/routes/conversationRoutes.js");
const readReceiptRoutes = require("./src/routes/readReceiptsRoutes.js");
const chatSocketHandler = require("./src/sockets/chatSocket"); // Adjust the path as necessary

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001", // Adjust this based on your frontend's URL
    methods: ["GET", "POST", "DELETE"],
  },
});

const PORT = process.env.PORT || 3001;

// Database connection
database.connect();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/user", userRoutes);
app.use("/conversations", conversationRoutes);
app.use("/readReceipts", readReceiptRoutes);

// Socket.IO
io.on("connection", (socket) => {
  // Pass the socket and io to the chatSocket handler
  chatSocketHandler(socket, io);

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Server succesfully running");
});
