/* conversationModel.js
 * Defines database schema/model for conversations table
*/
const db = require('../../database');


// Create a new conversation
const createConversation = async (conversationTitle, creatorID, lastMessageID, is_direct_message ) => {
    try {
        const queryText = `
            INSERT INTO conversations(conversation_title, creator_id, last_message_id,  is_direct_message)
            VALUES($1, $2, $3, $4)
            RETURNING *
            ;
        `;
        const values = [conversationTitle, creatorID, lastMessageID, is_direct_message];
        const result = await db.query(queryText, values);
        return result.rows[0];
    } 
    catch (error) {
        console.error('Error creating new conversation:', error);
        throw error;
    }
};

// Retrieve a specific conversation by ID
const getConversationByID = async (conversationId) => {
    const queryText = `
        SELECT * FROM conversations
        WHERE conversation_id = $1;
    `;
    try {
        const res = await db.query(queryText, [conversationId]);
        return res.rows[0];
    } catch (error) {
        throw error;
    }
};

// Add a user to a conversation
const addUserToConversation = async (userId, conversationId) => {
    const queryText = `
        INSERT INTO users_conversations(user_id, conversation_id)
        VALUES($1, $2)
        RETURNING *;
    `;
    try {
        const res = await db.query(queryText, [userId, conversationId]);
        return res.rows[0];
    } catch (error) {
        throw error;
    }
};

// Remove a user from a conversation
const removeUserFromConversation = async (userId, conversationId) => {
    const queryText = `
        DELETE FROM users_conversations
        WHERE user_id = $1 AND conversation_id = $2
        RETURNING *;
    `;
    try {
        const res = await db.query(queryText, [userId, conversationId]);
        return res.rows[0];
    } 
    catch (error) {
        throw error;
    }
};

// Retrieve all conversations a user is part of
const getUserConversations = async (userId) => {
    const queryText = `
        SELECT c.* FROM conversations c
        JOIN users_conversations uc ON c.conversation_id = uc.conversation_id
        WHERE uc.user_id = $1;
    `;
    try {
        const res = await db.query(queryText, [userId]);
        return res.rows;
    } 
    catch (error) {
        throw error;
    }
};

// Update the details of a conversation
const updateConversation = async (conversationId, newDetails) => {
    const queryText = `
        UPDATE conversations
        SET conversation_type = $2, conversation_title = $3
        WHERE conversation_id = $1
        RETURNING *;
    `;
    try {
        const res = await db.query(queryText, [conversationId, newDetails.conversationType, newDetails.conversationTitle]);
        return res.rows[0];
    } 
    catch (error) {
        throw error;
    }
};

// Delete a conversation
const deleteConversation = async (conversationId) => {
    const queryText = `
        DELETE FROM conversations
        WHERE conversation_id = $1
        RETURNING *;
    `;
    try {
        const res = await db.query(queryText, [conversationId]);
        return res.rows[0];
    } 
    catch (error) {
        throw error;
    }
};

// Get the last message of a conversation
const getLastMessageOfConversation = async (conversationId) => {
    const queryText = `
        SELECT * FROM messages
        WHERE conversation_id = $1
        ORDER BY time_sent DESC
        LIMIT 1;
    `;
    try {
        const res = await db.query(queryText, [conversationId]);
        return res.rows[0];
    } 
    catch (error) {
        throw error;
    }
};

module.exports = {
    createConversation,
    getConversationByID,
    addUserToConversation,
    removeUserFromConversation,
    getUserConversations,
    updateConversation,
    deleteConversation,
    getLastMessageOfConversation,
};


/*
Notes:
- Error Handling: Basic error handling is included. 
- Add/Remove User: Functions for adding and removing users handle the users_conversations table to maintain the relationship between users and conversations.
- Conversation Updates: The updateConversation function assumes passing an object with new details. Adjust the query as needed based on what details you allow to be updated.
- Deleting Conversations: Deleting a conversation should be done with care, especially if it affects related data in other tables.
*/