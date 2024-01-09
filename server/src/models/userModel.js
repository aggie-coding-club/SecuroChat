/* userModel.js
 * Defines database schema/model for users table
 */

const db = require("../../database");

/**
 * Creates users table responsible of managing user information and data
 * @returns {Promise<boolean>} Returns promise of true is successful. Otherwise throws error
 */
const createUserModel = async () => {
  try {
    const queryText = `
            CREATE TABLE users (
                user_id UUID PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                phone VARCHAR(15) NOT NULL UNIQUE,
                last_online TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                icon_color VARCHAR(7) NOT NULL
            );
        `;
    await db.query(queryText);
    return true;
  } catch (error) {
    console.log("Failed to create Users table");
    throw error;
  }
};

/**
 * Query responsible for creating new user entities given specified data such as userID, username, and phone number
 * @param {string} userID - string representing UUID for userID
 * @param {string} username - string representing unique username for each user
 * @param {string} phone  - string representation of phone number
 * @returns {Promise<boolean>} Returns promise of true if successful. Otherwise throws error.
 */
const createUserEntry = async (userID, username, phone, iconColor) => {
  try {
    const queryText = `
            INSERT INTO users(user_id, username, phone, icon_color) 
            VALUES ($1, $2, $3, $4) 
            ;
        `;
    const values = [userID, username, phone, iconColor];
    await db.query(queryText, values);
    return true;
  } catch (error) {
    console.log("Failed to create new user entry");
    throw error;
  }
};

/**
 * Query responsible for deleting entity in users table specified by userID
 * @param {string} userID - string representing unique UUID of user
 * @returns {Promise<boolean>} Returns promise of true if successful. Otherwise throws error
 */
const deleteUserEntry = async (userID) => {
  try {
    const queryText = `
            DELETE FROM users 
            WHERE user_id = $1
            ;
        `;
    const values = [userID];
    await db.query(queryText, values);
    return true;
  } catch (error) {
    console.log("Failed to delete user from users table");
    throw error;
  }
};

/**
 * Query responsible for retrieving specific user's username
 * @param {string} userID - String representation of user's UUID
 * @returns {Promise<string>} Returns the user's username as a string if successful. Otherwise throws error
 */
const getUsername = async (userID) => {
  try {
    const queryText = `
            SELECT username FROM users 
            WHERE user_id = $1 
            ;
        `;
    const values = [userID];
    const result = await db.query(queryText, values);
    return result.rows[0].username.toString();
  } catch (error) {
    console.log("Failed to retrieve username");
    throw error;
  }
};

/**
 * Query responsible for returning the specified user's information
 * @param {string} username - string representing users unique username
 * @returns {Promise<Object>} Returns object containing userID and profileColor if successful. Otherwise throws an error.
 */
const getUserInfo = async (username) => {
  try {
    const queryText = `
            SELECT user_id, icon_color FROM users 
            WHERE username = $1
            ;
        `;
    const values = [username];
    const result = await db.query(queryText, values);
    const userInfo = {
      userID: result.rows[0].user_id,
      iconColor: result.rows[0].icon_color,
    };
    return userInfo;
  } catch (error) {
    console.log("Failed to retrieve userID");
    throw error;
  }
};

/**
 * Query responsible for retrieving the timestamp at which user was last online
 * @param {string} userID - string representation of user's UUID
 * @returns {Promise<string>} Returns timestamp of last time online as a string. Otherwise throws error
 */
const getLastOnline = async (userID) => {
  try {
    const queryText = `
            SELECT last_online FROM users 
            WHERE user_id = $1
            ;
        `;
    const values = [userID];
    const result = await db.query(queryText, values);
    return result.rows[0].last_online.toString();
  } catch (error) {
    console.log("Failed to retrieve last online information");
    throw error;
  }
};

/**
 * Query responsible for updating the specified user's username
 * @param {string} newUsername - String which username is being set to
 * @param {string} userID - String representation of user's UUID
 * @returns {Promise<boolean>} Returns true if successful. Otherwise throws error
 */
const setUsername = async (newUsername, userID) => {
  try {
    const queryText = `
            UPDATE users SET username = $1
            WHERE user_id = $2
            ;
        `;
    const values = [newUsername, userID];
    await db.query(queryText, values);
    return true;
  } catch (error) {
    console.log("New username failed at setting");
    throw error;
  }
};

/**
 * Query responsible for updating the specified users last timestamp online
 * @param {string} newLastOnline - new timestamp string to store in database for user
 * @param {string} userID - string representation of user's UUID
 * @returns {Promise<boolean>} Returns true if successful. Otherwise throws error
 */
const setLastOnline = async (newLastOnline, userID) => {
  try {
    const queryText = `
            UPDATE users SET last_online = $1
            WHERE user_id = $2
            ;
        `;
    const values = [newLastOnline, userID];
    await db.query(queryText, values);
    return true;
  } catch (error) {
    console.log("Setting last online failed");
    throw error;
  }
};

/**
 * Query responsible for checking if the generated UUID is unique
 * @param {string} candidateUUID - Generated UUID to be verified is unique
 * @returns {Promise<boolean>} Returns true if candidateUUID is unique. Throws error otherwise
 */
const isUniqueUUID = async (candidateUUID) => {
  try {
    const queryText = `
            SELECT user_id FROM users
            WHERE user_id = $1
            ;
        `;
    const values = [candidateUUID];
    const result = await db.query(queryText, values);
    const isUnique = result.rows.length > 0 ? false : true;
    return isUnique;
  } catch (error) {
    console.error("Error verifying uniqueness of generated UUID");
    throw error;
  }
};

/**
 * Query responsible for verifying if inputted username information already exists within database or not
 * @param {string} candidateUsername - inputted candidate username as a string
 * @param {string} candidatePhone - inputted candidate phone number as a string
 * @returns {Promise<string>} Returns true if user information is unique. Else throws error
 */
const isUniqueUser = async (candidateUsername, candidatePhone) => {
  try {
    const queryText = `
            SELECT user_id FROM users
            WHERE username = $1 OR phone = $2
            ;
        `;
    const values = [candidateUsername, candidatePhone];
    const result = await db.query(queryText, values);
    const isUnique = result.rows.length > 0 ? false : true;
    return isUnique;
  } catch (error) {
    console.error("Failed to check if user is unique");
    throw error;
  }
};

/**
 * Query responsible for updating user's online status
 * @param {string} userID
 * @param {string} timeLastOnline
 * @returns {Promise<boolean>} = Returns promise of true if successful. Otherwise throws an error
 */
const updateUserOnlineStatus = async (userID, timeLastOnline) => {
  try {
    const queryText = `
           UPDATE users
           SET last_online = $1
           WHERE user_id = $2
           ; 
        `;
    const values = [timeLastOnline, userID];
    await db.query(queryText, values);
    return true;
  } catch (error) {
    console.error("Failed to update user's online status");
    throw error;
  }
};

module.exports = {
  createUserEntry,
  deleteUserEntry,
  getUsername,
  getLastOnline,
  getUserInfo,
  setUsername,
  setLastOnline,
  isUniqueUUID,
  isUniqueUser,
  updateUserOnlineStatus,
};
