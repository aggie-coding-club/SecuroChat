/* authenticationModel.js
 * Defines database schema/model for authentication table
*/

const passwordUtils = require('../utilities/passwordUtils');
const db = require('../../database');

/**
 * Creates authentication table handling all authentication data within securochat
 * @returns {Promise<boolean>} Returns promise of true if successful. Throws error otherwise
 */
const createAuthenticationTable = async () => {
    try {
        const queryText = `
            CREATE TABLE authentication ( 
                user_id UUID PRIMARY KEY REFERENCES users(user_id), 
                password_hash VARCHAR(255) NOT NULL, 
                public_key TEXT NOT NULL UNIQUE 
            );
        `;

        await db.query(queryText);
        return true;
    } 
    catch (error) {
        console.error('Error creating authentication table:', error);
        throw error;
    }
};

/**
 * Query responsible for creating entry in authentication table when new user is created
 * @param {string} userID - userID is represented as a UUID string
 * @param {string} hashedPassword - string representing hashed user password to be inserted into the database
 * @param {string} publicKey  - unique string public key used for end-to-end encryption of the user alongside clientside private key
 * @returns {Promise<boolean>} Returns promise of true if successful. Throws error otherwise
 */
const createAuthenticationEntry = async (userID, hashedPassword, publicKey) => {
    try {
        const queryText = `
            INSERT INTO authentication(user_id, password_hash, public_key) 
            VALUES ($1, $2, $3)
            ;  
        `;

        const values = [userID, hashedPassword, publicKey];
        await db.query(queryText, values);
        return true;
    }
    catch (error) {
        console.error('Error creating entry in authentication Table');
        throw error;
    }
};

/**
 * Query responsible for deleting user entry from authentication table. Called as an effect of deletion of user as a whole
 * @param {string} userID - userID entry represented as a UUID string to be deleted from authentication table
 * @returns {Promise<boolean>} Returns promise of true if successful. Throws error otherwise.
 */
const deleteAuthenticationEntry = async (userID) => {
    try {
        const queryText = `
            DELETE FROM authentication 
            WHERE user_id = $1
            ;
        `;
        
        const values = [userID];
        await db.query(queryText, values);
        return true;    
    }
    catch (error) {
        console.error('Failed to delete user from authentication Table');
        throw error;
    }
};

/**
 * Query reponsible for returning the hashed password of the specified user
 * @param {string} userID - userID entry represented as a UUID string to be deleted from authentication table
 * @returns {Promise<string>} Returns promise of user hashed password as a string if successful. Otherwise throws error.
 */
const getUserPassword = async (userID) => {
    try {
        const queryText = `
            SELECT password_hash FROM authentication 
            WHERE user_id = $1 
            ; 
        `;
        const values = [userID];
        const result = await db.query(queryText, values);
        return result.rows[0].password_hash.toString();
    } 
    catch (error) {
        console.log('Failed to retrieve user password');
        throw error;
    }
};

/**
 * Query is responsible for returning the public key of the specified user
 * @param {string} userID - userID entry represented as a UUID string
 * @returns {Promise<string>} Returns promise of user's public key as a string if successful. Otherwise throws error
 */
const getUserPublicKey = async (userID) => {
    try {
        const queryText = `
            SELECT public_key FROM authentication 
            WHERE user_id = $1 
            ;
        `;
        const values = [userID];
        const result = await db.query(queryText, values);
        return result.rows[0].public_key.toString();
    }
    catch (error) {
        console.log(`Failed to retrieve user's public key`);
        throw error;
    }
};

/**
 * Query responsible for updating specified users stored hashed password
 * @param {string} newHashedPassword - string representing the new hashed password to update password with
 * @param {string} userID - string representing user's UUID
 * @returns {Promise<boolean>} Returns promise of true if successful. Otherwise throws error
 */
const setUserPassword = async (newHashedPassword, userID) => {
    try {
        const queryText = `
            UPDATE authentication SET password_hash = $1
            WHERE user_id = $2
            ;
        `;
        const values = [newHashedPassword, userID];
        await db.query(queryText, values);
        return true;
    } 
    catch (error) {
        console.log('Updating password failed');
        throw error;
    }
};

/**
 * Query responsible for updating specific user's stored public key
 * @param {string} newPublicKey - string containing new public key to be updated to
 * @param {string} userID  - string representation of user's UUID
 * @returns {Promise<boolean>} Returns promise of true if successful. Otherwise throws error
 */
const setUserPublicKey = async (newPublicKey, userID) => {
    try {
        const queryText = `
            UPDATE authentication SET public_key = $1
            WHERE user_id = $2
            ;
        `;
        const values = [newPublicKey, userID];
        await db.query(queryText, values);
        return true;
    }
    catch (error) {
        console.log('Failed to update user public key');
        throw error;
    }
};

/**
 * Query responsible for authenticating client's inputted username/password combination
 * @param {string} candidateUsername - string representing clients inputted username
 * @param {string} candidatePassword - string representing client's inputted plaintext password
 * @returns {Promise<boolean>} Returns promise of a boolean being true if candidate user information matches existing credentials. Throws error otherwise
 */
const authenticateUser = async (candidateUsername, candidatePassword) => {
    try {
        const queryText = `
            SELECT users.user_id, users.username, authentication.hashed_password 
            FROM users 
            JOIN authentication ON users.user_id = authentication.user_id 
            WHERE users.username = $1 
            ;        
        `;
        const values = [candidateUsername];
        const result = await db.query(queryText, values);

        // verifying that username exists in database
        if (result.rows.length < 0) {
            return false;
        }

        //verifying that correct password inputted
        const hashedPassword = result.rows[0].hashedPassword;
        const passwordMatch = await passwordUtils.verifyPassword(candidatePassword, hashedPassword);
        return passwordMatch;
    }
    catch (error) {
        console.log("Error: Failed to authenticate user");
        throw error;
    }
};

module.exports = {
    createAuthenticationEntry,
    deleteAuthenticationEntry,
    getUserPassword,
    getUserPublicKey,
    setUserPassword,
    setUserPublicKey,
    authenticateUser,
};