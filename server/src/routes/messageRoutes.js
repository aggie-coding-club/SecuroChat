const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();

// Send a new message
router.post('/sned', messageController.sendMessage);

// Fetch messages in a conversation
router.get('/conversation/:conversationId', messageController.getMessages);

// Delete a message
router.delete('/:messageId', messageController.deleteMessage);

// Update a message
router.put('/:messageId', messageController.updateMessage);

// Get recent messages for a user
router.get('/recent/:userId', messageController.getRecentMessages);

// Mark a message as read
router.put('/read/:messageId', messageController.markMessageAsRead);

// Get unread messages for a user
router.get('/unread/:userId', messageController.getUnreadMessages);

module.exports = router;