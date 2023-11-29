/* conversationRoutes.js
 * Configures API routes for conversation interactions
*/

const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');

// Route for creating a conversation
router.post('/createNewConversation', conversationController.createNewConversation);

module.exports = router;