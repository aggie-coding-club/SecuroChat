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
 * @param {string} timeMessageSent - string containing time data where message was initially sent
 * @returns {Promise<string>} - Returns promise of messageID if successful, otherwise throws an error
 */
const createMessage = async (userID, messageText, conversationID, timeMessageSent) => {
  try {
    // using sql transactions to make sql statements atomic 
    await db.query("BEGIN");

    // creates new message entry in messages table
    const queryText = `
        INSERT INTO messages(user_id, messages_text, conversation_id)
        VALUES($1, $2, $3)
        RETURNING message_id
        ;
    `;
    const values = [userID, messageText, conversationID];
    const response = await db.query(queryText, values);
    const message_id = response.rows[0].message_id;
    
    // updating last message id of conversation and last updated time
    await updateLastMessageID(message_id, conversationID, timeMessageSent);
    await db.query("COMMIT");
    return message_id;
  } 
  catch (error) {
    await db.query("ROLLBACK");
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
              SELECT message_id, user_id, messages_text, time_sent FROM messages
              WHERE conversation_id = $1
              ORDER BY time_sent
              ;
          `;
    const values = [conversationID];
    const result = await db.query(queryText, values);
    
    // creating object array to return container message information
    const messagesData = [];
    for (let row of result.rows) {
        const rowEntry = {
            messageID: row.message_id,
            senderID: row.user_id,
            messageContent: row.messages_text,
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
        ;
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
        ;
    `;
    const values = [messageID, newMessageText];
    await db.query(queryText, values);
    return true;
  } 
  catch (error) {
    console.error('Error updating specified message', error);
    throw error;
  }
};

/**
 * Query responsible for updating last message ID of conversation and last updated time
 * @param {string} messageID - string representing message ID
 * @param {string} conversationID - string representing conversationID
 * @param {string} timeMessageSent - string representing time the message was sent
 * @returns {Promise<boolean>} - Returns promise of a boolean if successful, otherwise throws an error
 */
const updateLastMessageID = async (messageID, conversationID, timeMessageSent) => {
  try {
      const queryText = `
          UPDATE
              conversations
          SET 
              last_message_id = $1, updated_at = $2
          WHERE
              conversation_id = $3
          ;
      `;
      const values = [messageID, timeMessageSent, conversationID];
      await db.query(queryText, values);

      return true;
  } 
  catch (error) {
      console.error('Error when fetching user conversations', error);
      throw error;    
  }
};

module.exports = {
  createMessage,
  getMessagesByConversation,
  deleteMessage,
  updateMessage,
  updateLastMessageID,
};
