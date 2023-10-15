// server/index.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Handle Cross-Origin Resource Sharing (configure as needed)
app.use(helmet()); // Set security headers
app.use(express.json()); // Parses JSON request body
app.use(express.urlencoded({ extended: true })); // Parses x-www-form-urlencoded

// Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to SecuroChat!');
});
