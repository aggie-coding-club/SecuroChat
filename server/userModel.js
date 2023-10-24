// TODO : Error handling
// TODO : SQL POOLING
const { Client } = require('pg');

// Create a new client instance
const client = new Client({
    host: 'your-rds-endpoint.amazonaws.com', // replace with your RDS endpoint
    port: 5432,
    database: 'your-database-name',
    user: 'your-username',
    password: 'your-password',
    ssl: {
        rejectUnauthorized: false // You might need this if RDS is set up with the default RDS certs
    }
});

client.connect();

const userModel = {
    // Fetch all users
    getAllUsers: async () => {
        const result = await client.query('SELECT * FROM users');
        return result.rows;
    },

    // Fetch a user by ID
    getUserById: async (id) => {
        const result = await client.query('SELECT * FROM users WHERE user_id = $1', [id]);
        return result.rows[0];
    },

    // Add a new user
    addUser: async (userData) => {
        const { username, phone, email, online_status, last_online } = userData;
        const result = await client.query(
            'INSERT INTO users (username, phone, email, online_status, last_online) VALUES ($1, $2, $3, $4, $5) RETURNING user_id',
            [username, phone, email, online_status, last_online]
        );
        return result.rows[0].user_id;
    },

    // Update user details
    updateUser: async (id, userData) => {
        const { username, phone, email, online_status, last_online } = userData;
        await client.query(
            'UPDATE users SET username = $1, phone = $2, email = $3, online_status = $4, last_online = $5 WHERE user_id = $6',
            [username, phone, email, online_status, last_online, id]
        );
    },

    // Delete a user by ID
    deleteUser: async (id) => {
        await client.query('DELETE FROM users WHERE user_id = $1', [id]);
    }
};

module.exports = userModel;
