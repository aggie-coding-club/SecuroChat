/* authenticationModel.js
 * Defines database schema/model for authentication table
*/

const database = require('../../database');

/**
 * Creates authentication table handling all authentication data within securochat
 * @returns {boolean} Returns true if successful, false otherwise
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
        console.log('Authentication table created successfully');
        return true;
    } 
    catch (error) {
        console.error('Error creating authentication table:', error);
        return false;
    }
};

/**
 * Query responsible for creating entry in authentication table when new user is created
 * @param {string} userID - userID is represented as a UUID string
 * @param {string} hashedPassword - string representing hashed user password to be inserted into the database
 * @param {string} publicKey  - unique string public key used for end-to-end encryption of the user alongside clientside private key
 * @returns {boolean} Returns true if successful, false otherwise
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
        console.log('Authentication entry successfully created');
        return true;
    }
    catch (error) {
        console.error('Error creating entry in authentication Table');
        return false;
    }
};

/**
 * Query responsible for deleting user entry from authentication table. Called as an effect of deletion of user as a whole
 * @param {string} userID - userID entry represented as a UUID string to be deleted from authentication table
 * @returns {boolean} Returns true if successful, false otherwise
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
        console.log('Successfully deleted user from authentication Table');
        return true;    
    }
    catch (error) {
        console.error('Failed to delete user from authentication Table');
        return false;
    }
};

/**
 * Query reponsible for returning the hashed password of the specified user
 * @param {string} userID - userID entry represented as a UUID string to be deleted from authentication table
 * @returns {string} Returns user hashed password as a string if successful. Otherwise returns empty string
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
        console.log('Successfully retrieved user password');
        return result.rows[0].password_hash.toString();
    } 
    catch (error) {
        console.log('Failed to retrieve user password');
        return "";
    }
};

/**
 * Query is responsible for returning the public key of the specified user
 * @param {string} userID - userID entry represented as a UUID string
 * @returns {string} Returns user's public key as a string if successful. Otherwise returns empty string.
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
        console.log(`Successfully retrieved user's public key`);
        return result.rows[0].public_key.toString();
    }
    catch (error) {
        console.log(`Failed to retrieve user's public key`);
        return "";
    }
}


module.exports = {
    createAuthenticationEntry,
    deleteAuthenticationEntry,
    getUserPassword,
    getUserPublicKey,
};