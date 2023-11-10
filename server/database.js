/* database.js
 * Responsible for creating sequelize instance of the postgresql database
 */

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// Create a connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

// Connect to the database
const connect = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

module.exports = {
  connect,
  query: (text, params) => pool.query(text, params),
};