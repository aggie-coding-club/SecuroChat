/* messageRoutes.js
 * Sets up API routes for sending and receiving messages
 */

const express = require("express");
const messageController = require("../controllers/messageController");
const router = express.Router();

// route for sending a message
router.post("/sendMessage", messageController.sendMessage);

// route for fetching messages by conversation
router.get(
  "/fetchMessagesByConversation",
  messageController.fetchMessagesByConversation
);

// route for updating a message
router.put("/updateMessage", messageController.updateMessage);

// route for deleting a message
router.delete("/deleteMessage", messageController.deleteMessage);

module.exports = router;
