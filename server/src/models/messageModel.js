/* messageModel.js
 * Defines database schema/model for messages table
*/

const db = require('../../database');
/**
 * creates message model
 * @returns true if successful
 */
const createMessageModel = async () => {
    try{
        const queryText = `
            CREATE TABLE messages (
                message_id SERIAL PRIMARY KEY,
                user_id UUID NOT NULL REFERENCES users(user_id),
                messages_text TEXT NOT NULL,
                time_sent TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                conversation_id INT NOT NULL REFERENCES conversations(conversation_id)
            );
        `;
        await db.query(queryText);
        return true;
    }
    catch(error){
        console.log('Failed to create messages model');
        throw error;
    }
};
/**
 * creates messages entry given messageID, user ID, messages Text, time sent , and conversation ID
 * @param {*} messageID 
 * @param {*} userID 
 * @param {*} messagesText 
 * @param {*} timeSent 
 * @param {*} conversationID 
 * @returns true if successful
 */
const createMessageEntry = async (messageID, userID, messagesText, timeSent, conversationID) => {
    try{
        const queryText = `
            INSERT INTO messages (message_id, user_id, messages_text, time_sent, conversation_id)
            VALUES ($1, $2, $3, $4, $5);
        `;
        const values = [messageID, userID, messagesText, timeSent, conversationID];
        await db.query(queryText, values);
        return true;
    }
    catch(error){
        console.log('Failed to create messages entry');
        throw error;
    }
};
/**
 * Find message ID given user ID, message text, time sent and conversation ID
 * @param {*} userID 
 * @param {*} messagesText 
 * @param {*} timeSent 
 * @param {*} conversationID 
 * @returns message ID
 */
const getMessageID = async (userID, messagesText, timeSent, conversationID) =>{
    try{
        const queryText = `
            SELECT message_id FROM messages
            WHERE user_id = $1
            AND messages_text = $2
            AND time_sent = $3
            AND conversation_id = $4;
        `;
        const values = [userID, messagesText, timeSent, conversationID];
        const result = await db.query(queryText, values);
        return result.rows[0].message_id.toString();
    }
    catch(error){
        console.log('Failed to find message ID');
        throw error;
    }
};
/**
 * find messages text given the message id
 * @param {*} messageID 
 * @returns message text
 */
const getMessagesText = async (messageID) =>{
    try{
        const queryText = `
            SELECT messages_text FROM messages
            WHERE message_id = $1;
        `;
        const values = [messageID];
        const result = await db.query(queryText, values);
        return result.rows[0].messages_text.toString();
    }
    catch(error){
        console.log('Failed to find message text');
        throw error;
    }
};
/**
 * finds time sent of a message given the message ID
 * @param {*} messageID 
 * @returns time sent of a message
 */
const getTimeSent = async (messageID) =>{
    try{
        const queryText = `
            SELECT time_sent FROM messages
            WHERE message_id = $1;
        `;
        const values = [messageID];
        const result = await db.query(queryText, values);
        return result.rows[0].time_sent.toString();
    }
    catch(error){
        console.log('Failed to find time sent');
        throw error;
    }
};
/**
 * finds conversation ID given messageID
 * @param {*} messageID 
 * @returns conversation ID
 */
const getConversationID = async (messageID) =>{
    try{
        const queryText = `
            SELECT conversation_id FROM messages
            WHERE message_id = $1;
        `;
        const values = [messageID];
        const result = await db.query(queryText, values);
        return result.rows[0].conversation_id.toString();
    }
    catch(error){
        console.log('Failed to find conversationID');
        throw error;
    }
};
/**
 * deletes message given the message ID
 * @param {*} messageID 
 * @returns true if successful
 */
const deleteMessageEntry = async (messageID) =>{
    try{
        const queryText = `
            DELETE FROM messages
            WHERE message_id = $1;
        `;
        const values = [messageID];
        await db.query(queryText, values);
        return true;
    }
    catch(error){
        console.log('Failed to delete message');
        throw error;
    }
};

module.exports = {
    createMessageModel,
    createMessageEntry,
    getConversationID,
    getMessageID,
    getMessagesText,
    getTimeSent,
    deleteMessageEntry,
}
