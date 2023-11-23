/*
functions for interacting with the messages table in the database
*/

const db = require('../../database.js');

const MessageModel = {
    // Create a new message
    createMessage: async (userId, conversationId, messageText) => {
        const queryText = `
            INSERT INTO messages(user_id, conversation_id, messages_text)
            VALUES($1, $2, $3)
            RETURNING *;
        `;
        try {
            const res = await db.query(queryText, [userId, conversationId, messageText]);
            return res.rows[0];
        }
        catch (error) {
            throw error;
        }
    },

    // Retrieve messages from a specific conversation
    getMessagesByConversation: async (conversationId) => {
        const queryText = `
            SELECT * FROM messages
            WHERE conversation_id = $1
            ORDER BY time_sent;
        `;
        try {
            const res = await db.query(queryText, [conversationId]);
            return res.rows;
        }
        catch (error) {
            throw error;
        }
    },

    // Get recent messages for a user
    getRecentMessagesForUser: async (userId, limit = 10) => {
        const queryText = `
            SELECT m.* FROM messages m
            JOIN users_conversations uc ON m.conversation_id = uc.conversation_id
            WHERE uc.user_id = $1
            ORDER BY m.time_sent DESC
            LIMIT $2;
        `;
        try {
            const res = await db.query(queryText, [userId, limit]);
            return res.rows;
        }
        catch (error) {
            throw error;
        }
    },

    // Delete a specific message
    deleteMessage: async (messageId) => {
        const queryText = `
            DELETE FROM messages
            WHERE message_id = $1
            RETURNING *;
        `;
        try {
            const res = await db.query(queryText, [messageId]);
            return res.rows[0];
        }
        catch (error) {
            throw error;
        }
    },

    // Update the content of an existing message
    updateMessage: async (messageId, newMessageText) => {
        const queryText = `
            UPDATE messages
            SET messages_text = $2
            WHERE message_id = $1
            RETURNING *;
        `;
        try {
            const res = await db.query(queryText, [messageId, newMessageText]);
            return res.rows[0];
        }
        catch (error) {
            throw error;
        }
    },

    // Retrieve a specific message by its ID
    getMessageById: async (messageId) => {
        const queryText = `
            SELECT * FROM messages
            WHERE message_id = $1;
        `;
        try {
            const res = await db.query(queryText, [messageId]);
            return res.rows[0];
        }
        catch (error) {
            throw error;
        }
    },

    // Mark a message as read
    markMessageAsRead: async (userId, messageId) => {
        const queryText = `
            INSERT INTO read_receipts(user_id, message_id, time_read)
            VALUES($1, $2, NOW())
            RETURNING *;
        `;
        try {
            const res = await db.query(queryText, [userId, messageId]);
            return res.rows[0];
        }
        catch (error) {
            throw error;
        }
    },

    // Get unread messages for a user
    getUnreadMessagesForUser: async (userId) => {
        const queryText = `
            SELECT m.* FROM messages m
            LEFT JOIN read_receipts rr ON m.message_id = rr.message_id AND rr.user_id = $1
            WHERE rr.read_receipts_id IS NULL AND m.user_id != $1;
        `;
        try {
            const res = await db.query(queryText, [userId]);
            return res.rows;
        }
        catch (error) {
            throw error;
        }
    },
};

module.exports = MessageModel;


/*
Notes:
- Error Handling: Each function includes basic error handling. We might want to expand on this depending on your application's requirements.
- Functionality: This model covers creating, retrieving, updating, deleting, and marking messages as read, along with fetching recent and unread messages.
- Message Deletion and Updates: These functions assume that application's logic will allow for message deletion and updates. Adjust as necessary based on app's features.
- Read Receipts: The markMessageAsRead function interacts with the read_receipts table. Ensure that this aligns with your application's requirements for read receipts.
*/