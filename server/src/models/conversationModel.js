/* conversationModel.js
 * Defines database schema/model for conversations table
*/
const db = require('../../database');

/**
 * Query responsible for creating conversations table
 * @returns {Promise<boolean>} returns true is successful, otherwise throws error
 */
const createConversationsTable = async () => {
    try {
        const queryText = ` 
            CREATE TABLE conversations (
                conversation_id SERIAL PRIMARY KEY,
                conversation_title VARCHAR(32) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                creator_id UUID NOT NULL REFERENCES users(user_id),
                is_direct_message BOOLEAN NOT NULL,
                last_message_id INT REFERENCES messages(message_id),
                num_participants INT NOT NULL
            );
        `;
        await db.query(queryText);
        return true;
    }
    catch {
        console.error('Error creating conversations table', error);
        throw error;
    }
};

/**
 * Query responsible for creating a new conversation
 * @param {string} conversationTitle - string to be displayed as the conversation title
 * @param {string} creatorID - UUID of the creator of the conversation
 * @param {boolean} isDirectMessage - boolean representing whether the converation is a DM or not
 * @param {string} lastMessageID - string represening messageID of last delivered message of conversation
 * @param {string} numParticipants - string representing number of participants within a conversation
 * @returns {Promise<boolean>} Returns promise of true if successful. Otherwise throws error.
 */
const createConversation = async (conversationTitle, creatorID, isDirectMessage, lastMessageID, numParticipants ) => {
    try {
        const queryText = `
            INSERT INTO conversations(conversation_title, creator_id, is_direct_message, last_message_id, num_participants)
            VALUES($1, $2, $3, $4, $5)
            ;
        `;
        const values = [conversationTitle, creatorID, isDirectMessage, lastMessageID, numParticipants];
        await db.query(queryText, values);
        return true;
    } 
    catch (error) {
        console.error('Error creating new conversation:', error);
        throw error;
    }
};

/**
 * Query responsible for altering the title of a conversation 
 * @param {string} conversationTitle - new title of the conversation
 * @param {string} conversationID - string representing ID of conversation
 * @returns {Promise<boolean>} - Returns a promise of true if successful. Otherwise throws an error.
 */
const alterConversationTitle = async (conversationTitle, conversationID) => {
    try {
        const queryText = `
            UPDATE conversations
            SET conversation_title = $1
            WHERE conversation_id = $2
            ;
        `;
        const values = [conversationTitle, conversationID];
        await db.query(queryText, values);
        return true;
    } 
    catch (error) {
        console.error('Error altering the conversation title:', error);
        throw error;
    }
};


/**
 * Query responsible for deleting conversation from specified conversationID. Ensures to delete entries in dependent tables like users_conversations and messages as well
 * @param {string} conversationID - string representing conversation ID
 * @returns {Promise<boolean>} - Returns promise of true if successful. Otherwise throws an error.
 */
const deleteConversation = async (conversationID) => {
    try {
        // makes use of ON DELETE CASCADE to delete conversations table entry ensuring dependent entries in other tables are also altered
        // conversations dependent tables are: users_conversations, messages
        // causes changes in message dependent tables such as: attachments, read_receipts, and notifications

        const queryText = `
            DELETE FROM conversations
            WHERE conversation_id = $1
            ;
        `;
        const values = [conversationID];
        await db.query(queryText, values);
        return true;
    } 
    catch (error) {
        console.error('Error deleting the specified conversation', error);
        throw error;
    }
};

/**
 * Query responsible for retrieving last message of conversation
 * @param {string} conversationID - string representing ID of conversation
 * @returns {Promise<string>} - Returns a promise of a string if successful. Otherwise throws an error.
 */
const getLastMessageOfConversation = async (conversationID) => {
    try {
        const queryText = `
            SELECT messages_text FROM messages
            JOIN conversations ON conversations.last_message_id = messages.message_id
            WHERE conversations.conversation_id = $1
            ;
        `;
        const values = [conversationID];
        const result = await db.query(queryText, values);
        return result.rows[0];
    } 
    catch (error) {
        console.error('Error fetching last message of conversation:', error);
        throw error;
    }
};

module.exports = {
    createConversation,
    alterConversationTitle,
    deleteConversation,
    getLastMessageOfConversation,
};