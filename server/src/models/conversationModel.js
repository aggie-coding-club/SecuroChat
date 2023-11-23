const db = require('../../database.js');

const ConversationModel = {
    // Create a new conversation
    createConversation: async (conversationType, conversationTitle, creatorId) => {
        const queryText = `
            INSERT INTO conversations(conversation_type, conversation_title, creator_id)
            VALUES($1, $2, $3)
            RETURNING *;
        `;
        try {
            const res = await db.query(queryText, [conversationType, conversationTitle, creatorId]);
            return res.rows[0];
        } catch (error) {
            throw error;
        }
    },

    // Retrieve a specific conversation by ID
    getConversationById: async (conversationId) => {
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
    },

    // Add a user to a conversation
    addUserToConversation: async (userId, conversationId) => {
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
    },

    // Remove a user from a conversation
    removeUserFromConversation: async (userId, conversationId) => {
        const queryText = `
            DELETE FROM users_conversations
            WHERE user_id = $1 AND conversation_id = $2
            RETURNING *;
        `;
        try {
            const res = await db.query(queryText, [userId, conversationId]);
            return res.rows[0];
        } catch (error) {
            throw error;
        }
    },

    // Retrieve all conversations a user is part of
    getConversationsForUser: async (userId) => {
        const queryText = `
            SELECT c.* FROM conversations c
            JOIN users_conversations uc ON c.conversation_id = uc.conversation_id
            WHERE uc.user_id = $1;
        `;
        try {
            const res = await db.query(queryText, [userId]);
            return res.rows;
        } catch (error) {
            throw error;
        }
    },

    // Update the details of a conversation
    updateConversation: async (conversationId, newDetails) => {
        const queryText = `
            UPDATE conversations
            SET conversation_type = $2, conversation_title = $3
            WHERE conversation_id = $1
            RETURNING *;
        `;
        try {
            const res = await db.query(queryText, [conversationId, newDetails.conversationType, newDetails.conversationTitle]);
            return res.rows[0];
        } catch (error) {
            throw error;
        }
    },

    // Delete a conversation
    deleteConversation: async (conversationId) => {
        const queryText = `
            DELETE FROM conversations
            WHERE conversation_id = $1
            RETURNING *;
        `;
        try {
            const res = await db.query(queryText, [conversationId]);
            return res.rows[0];
        } catch (error) {
            throw error;
        }
    },

    // Get the last message of a conversation
    getLastMessageOfConversation: async (conversationId) => {
        const queryText = `
            SELECT * FROM messages
            WHERE conversation_id = $1
            ORDER BY time_sent DESC
            LIMIT 1;
        `;
        try {
            const res = await db.query(queryText, [conversationId]);
            return res.rows[0];
        } catch (error) {
            throw error;
        }
    },
};

module.exports = ConversationModel;


/*
Notes:
- Error Handling: Basic error handling is included. 
- Add/Remove User: Functions for adding and removing users handle the users_conversations table to maintain the relationship between users and conversations.
- Conversation Updates: The updateConversation function assumes passing an object with new details. Adjust the query as needed based on what details you allow to be updated.
- Deleting Conversations: Deleting a conversation should be done with care, especially if it affects related data in other tables.
*/