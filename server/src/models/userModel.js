/* userModel.js
 * Defines database schema/model for users table
*/

const database = require('../../database');

/**
 * Creates users table responsible of managing user information and data
 * @returns {boolean} Returns true is successful. Otherwise returns false
 */
const createUserModel = async () => {
    try {
        const queryText = `
            CREATE TABLE users (
                user_id UUID PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                phone VARCHAR(15) NOT NULL UNIQUE,
                last_online TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;
        await database.query(queryText);
        console.log('Users Table Created successfully');
        return true;
    } 
    catch (error) {
        console.log('Failed to create Users table');
        return false;
    }
};

/**
 * Query responsible for creating new user entities given specified data such as userID, username, and phone number
 * @param {string} userID - string representing UUID for userID
 * @param {string} username - string representing unique username for each user
 * @param {string} phone  - string representation of phone number
 * @returns {boolean} Returns true if successful. Otherwise returns false
 */
const createUserEntry = async (userID, username, phone) => {
    try {
        const queryText = `
            INSERT INTO users(user_id, username, phone) 
            VALUES ($1, $2, $3) 
            ;
        `;
        const values = [userID, username, phone];
        await database.query(queryText, values);
        console.log('New user entry successfully created');
        return true;
    } 
    catch (error) {
        console.log('Failed to create new user entry');
        return false;
    }
};

/**
 * Query responsible for deleting entity in users table specified by userID
 * @param {string} userID - string representing unique UUID of user
 * @returns {boolean} Returns true if successful. Otherwise returns false
 */
const deleteUserEntry = async (userID) => {
    try {
        const queryText = `
            DELETE FROM users 
            WHERE user_id = $1
            ;
        `;
        const values = [userID];
        await database.query(queryText, values);
        console.log('User successfully deleted from users table');
        return true;
    } 
    catch (error) {
        console.log('Failed to delete user from users table');
        return false;
    }
};

/**
 * Query responsible for retrieving specific user's username
 * @param {string} userID - String representation of user's UUID
 * @returns {string} Returns the user's username as a string if successful. Otherwise returns empty string
 */
const getUsername = async (userID) => {
    try {
        const queryText = `
            SELECT username FROM users 
            WHERE user_id = $1 
            ;
        `;
        const values = [userID];
        const result = await database.query(queryText, values);
        console.log('username successfully retrieved');
        return result.rows[0].username.toString();
    }
    catch (error) {
        console.log('Failed to retrieve username');
        return "";
    }
};

/**
 * Query responsible for retrieving the timestamp at which user was last online
 * @param {string} userID - string representation of user's UUID
 * @returns {string} Returns timestamp of last time online as a string
 */
const getLastOnline = async (userID) => {
    try {
        const queryText = `
            SELECT last_online FROM users 
            WHERE user_id = $1
            ;
        `;
        const values = [userID];
        const result = await database.query(queryText, values);
        console.log('Last online information successfully retrieved');
        return result.rows[0].last_online.toString();
    }
    catch (error) {
        console.log('Failed to retrieve last online information');
        return "";
    }
};

/**
 * Query responsible for updating the specified user's username
 * @param {string} newUsername - String which username is being set to
 * @param {string} userID - String representation of user's UUID
 * @returns {boolean} Returns true if successful. Otherwise returns false.
 */
const setUsername = async (newUsername, userID) => {
    try {
        const queryText = `
            UPDATE users SET username = $1
            WHERE user_id = $2
            ;
        `;
        const values = [newUsername, userID];
        await database.query(queryText, values);
        console.log('New username successfully set');
        return true;
    }
    catch (error) {
        console.log('New username failed at setting');
        return false;
    }
};

/**
 * Query responsible for updating the specified users last timestamp online
 * @param {string} newLastOnline - new timestamp string to store in database for user
 * @param {string} userID - string representation of user's UUID
 * @returns {boolean} Returns true if successful. Otherwise returns false.
 */
const setLastOnline = async (newLastOnline, userID) => {
    try {
        const queryText = `
            UPDATE users SET last_online = $1
            WHERE user_id = $2
            ;
        `;
        const values = [newLastOnline, userID];
        await database.query(queryText, values);
        console.log('Setting last online successful');
        return true;
    } 
    catch (error) {
        console.log('Setting last online failed');
        return false;
    }
};

module.exports = {
    createUserEntry,
    deleteUserEntry,
    getUsername,
    getLastOnline,
    setUsername,
    setLastOnline,
}