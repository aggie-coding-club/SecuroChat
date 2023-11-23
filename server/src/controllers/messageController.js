/* messageController.js
 * responsible for sending and receiving direct and group messages
 * Stores messages in the postgresql database
 * fetches message history for conversations
*/

const MessageModel = require('../models/messageModel');

const messageController = {
    // Send a new message
    sendMessage: async (req, res) => {
        try {
            const { userId, conversationId, messageText } = req.body;
            const newMessage = await MessageModel.createMessage(userId, conversationId, messageText);
            res.status(201).json(newMessage);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Fetch messages in a conversation
    getMessages: async (req, res) => {
        try {
            const { conversationId } = req.params;
            const messages = await MessageModel.getMessagesByConversation(conversationId);
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a message
    deleteMessage: async (req, res) => {
        try {
            const { messageId } = req.params;
            const deletedMessage = await MessageModel.deleteMessage(messageId);
            res.status(200).json(deletedMessage);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update a message
    updateMessage: async (req, res) => {
        try {
            const { messageId } = req.params;
            const { newMessageText } = req.body;
            const updatedMessage = await MessageModel.updateMessage(messageId, newMessageText);
            res.status(200).json(updatedMessage);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get recent messages for a user
    getRecentMessages: async (req, res) => {
        try {
            const { userId } = req.params;
            const recentMessages = await MessageModel.getRecentMessagesForUser(userId);
            res.status(200).json(recentMessages);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Mark a message as read
    markMessageAsRead: async (req, res) => {
        try {
            const { userId, messageId } = req.body;
            const readReceipt = await MessageModel.markMessageAsRead(userId, messageId);
            res.status(200).json(readReceipt);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get unread messages for a user
    getUnreadMessages: async (req, res) => {
        try {
            const { userId } = req.params;
            const unreadMessages = await MessageModel.getUnreadMessagesForUser(userId);
            res.status(200).json(unreadMessages);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = messageController;
