/* conversationRoutes.js
 * Configures API routes for conversation interactions
*/

const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');

// Route for creating a conversation
router.post('/createNewConversation', conversationController.createNewConversation);

// Route for deleting a conversation

// Route for removing user from a conversation

// Route for adding users to a conversation

// Route for fetching user's conversations
router.get('/fetchUserConversations', conversationController.fetchUserConversations);

module.exports = router;