/* messageModel.js
 * Defines database schema/model for conversations table
 */

const db = require("../../database");

/**
 * Query responsible for creating messages table within database
 * @returns {Promise<boolean>} Returns promise of true if successful. Otherwise throws error
 */
const createMessagesTable = async () => {
    try {
        const queryText = `
            CREATE TABLE messages (
            message_id SERIAL PRIMARY KEY,
            user_id UUID NOT NULL REFERENCES users(user_id),
            messages_text TEXT NOT NULL,
            time_sent TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            conversation_id INT NOT NULL REFERENCES conversations(conversation_id) ON DELETE CASCADE
            );    
        `;
        await db.query(queryText);
        return true;
    } 
    catch (error) {
        console.error('Error creating messages table', error);
        throw error;
    }
};

/**
 * Query creating new entry within messages table
 * @param {string} userID - string representing UUID of the sender of the message
 * @param {string} messageText - string of message content 
 * @param {string} conversationID - string conversationID which message belongs to
 * @returns {Promise<string>} - Returns promise of messageID if successful, otherwise throws an error
 */
const createMessage = async (userID, messageText, conversationID) => {
  try {
    const queryText = `
        INSERT INTO messages(user_id, messages_text, conversation_id)
        VALUES($1, $2, $3)
        RETURNING message_id
        ;
    `;
    const values = [userID, messageText, conversationID];
    const response = await db.query(queryText, values);
    const message_id = response.rows[0].message_id;
    return message_id;
  } 
  catch (error) {
    console.error('Error creating new message', error);
    throw error;
  }
};

/**
 * Query responsible for retrieving conversation's message data
 * @param {string} conversationID - string representing conversation's ID
 * @returns {Promise<Array>} - Returns a promise of an object array if successful, otherwise throws error
 */
const getMessagesByConversation = async (conversationID) => {
  try {
    const queryText = `
              SELECT userID, messages_text, time_sent FROM messages
              WHERE conversation_id = $1
              ORDER BY time_sent;
          `;
    const values = [conversationID];
    const result = await db.query(queryText, values);
    
    // creating object array to return container message information
    const messagesData = [];
    for (let row of result.rows) {
        const rowEntry = {
            senderID: row.userID,
            messageContent: row.message_text,
            timeMessageSent: row.time_sent,
        };
        messagesData.push(rowEntry);
    }
    return messagesData;
  } 
  catch (error) {
    console.error('Error fetching messages by conversation', error);
    throw error;
  }
};

/**
 * Query responsible for deleting a specifed message
 * @param {string} messageID - message ID of specified message to delete
 * @returns {Promise<boolean>} - Returns promise of true if successful. Otherwise throws and error
 */
const deleteMessage = async (messageID) => {
  try {
    const queryText = `
        DELETE FROM messages
        WHERE message_id = $1
    `;
    const values = [messageID];
    await db.query(queryText, values);
    return true;
  } 
  catch (error) {
    console.error('Error deleting message', error);
    throw error;
  }
};

/**
 * Query responsible for updating a specified message's content
 * @param {string} messageID - message ID to alter content
 * @param {string} newMessageText - new content to replace old message with
 * @returns {Promise<boolean>} - Returns promise of true if successful. Otherwise throws an error.
 */
const updateMessage = async (messageID, newMessageText) => {
  try {
    const queryText = `
        UPDATE messages
        SET messages_text = $2
        WHERE message_id = $1
    `;
    const values = [messageID, newMessageText];
    await db.query(queryText, values);
    return true;
  } catch (error) {
    console.error('Error updating specified message', error);
    throw error;
  }
};

// // Mark a message as read
// const markMessageAsRead = async (userId, messageId) => {
//   const queryText = `
//             INSERT INTO read_receipts(user_id, message_id, time_read)
//             VALUES($1, $2, NOW())
//             RETURNING *;
//         `;
//   try {
//     const res = await db.query(queryText, [userId, messageId]);
//     return res.rows[0];
//   } catch (error) {
//     throw error;
//   }
// };

// // Get unread messages for a user
// const getUnreadMessagesForUser = async (userId) => {
//   const queryText = `
//             SELECT m.* FROM messages m
//             LEFT JOIN read_receipts rr ON m.message_id = rr.message_id AND rr.user_id = $1
//             WHERE rr.read_receipts_id IS NULL AND m.user_id != $1;
//         `;
//   try {
//     const res = await db.query(queryText, [userId]);
//     return res.rows;
//   } catch (error) {
//     throw error;
//   }
// };

module.exports = {
  createMessage,
  getMessagesByConversation,
  deleteMessage,
  updateMessage,
};
