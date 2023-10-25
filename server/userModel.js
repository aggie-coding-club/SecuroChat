const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Initialize a new Pool instance
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: true // Change this as per setup
    }
});

const userModel = {
    // Fetch all users
    getAllUsers: async () => {
        try {
            const result = await pool.query('SELECT * FROM users');
            return result.rows;
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw error;
        }
    },

    // Fetch a user by ID
    getUserById: async (id) => {
        try {
            const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
            return result.rows[0];
        } catch (error) {
            console.error(`Error fetching user with ID ${id}:`, error);
            throw error;
        }
    },

    // Add a new user
    addUser: async (userData) => {
        try {
            const { username, phone, email, online_status, last_online } = userData;
            const result = await pool.query(
                'INSERT INTO users (username, phone, email, online_status, last_online) VALUES ($1, $2, $3, $4, $5) RETURNING user_id',
                [username, phone, email, online_status, last_online]
            );
            return result.rows[0].user_id;
        } catch (error) {
            console.error('Error adding a user:', error);
            throw error;
        }
    },

    // Update user details
    updateUser: async (id, userData) => {
        try {
            const { username, phone, email, online_status, last_online } = userData;
            await pool.query(
                'UPDATE users SET username = $1, phone = $2, email = $3, online_status = $4, last_online = $5 WHERE user_id = $6',
                [username, phone, email, online_status, last_online, id]
            );
        } catch (error) {
            console.error(`Error updating user with ID ${id}:`, error);
            throw error;
        }
    },

    // Delete a user by ID
    deleteUser: async (id) => {
        try {
            await pool.query('DELETE FROM users WHERE user_id = $1', [id]);
        } catch (error) {
            console.error(`Error deleting user with ID ${id}:`, error);
            throw error;
        }
    }
};

module.exports = userModel;



// **************************************************************************************
// environment variables for database connection MUST BE SET UP before this can be used
// **************************************************************************************
