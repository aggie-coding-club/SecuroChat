/* messageController.js
 * responsible for sending and receiving direct and group messages
 * Stores messages in the postgresql database
 * fetches message history for conversations
 */

const jwt = require("jsonwebtoken");
const messageModel = require("../models/messageModel");

// controller method for sending a new message
const sendMessage = async (req, res) => {
  try {
    const tokenHeader = req.header("Authorization");
    const token = tokenHeader.split(" ")[1];
    if (!token) {
      // handles the case where the token is not present
      return res
        .status(401)
        .json({ error: "Unauthorized: JSON Web Token missing" });
    }

    // verifying json web token and obtaining client userID
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);

    // obtaining data from request body
    const { conversationID, messageText, timeMessageSent } = req.body;

    await messageModel.createMessage(
      decodedJWT.userID,
      messageText,
      conversationID,
      timeMessageSent
    );
    res
      .status(200)
      .json({ success: true, message: "successfully accepted friend request" });
  } catch (error) {
    console.error("Error when sending a new message ", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// controller method for fetching all messages of a conversation
const fetchMessagesByConversation = async (req, res) => {
  try {
    const tokenHeader = req.header("Authorization");
    const token = tokenHeader.split(" ")[1];
    if (!token) {
      // handles the case where the token is not present
      return res
        .status(401)
        .json({ error: "Unauthorized: JSON Web Token missing" });
    }

    // verifying json web token and obtaining client userID
    jwt.verify(token, process.env.JWT_SECRET);

    const { conversationID } = req.query;
    const messages = await messageModel.getMessagesByConversation(
      conversationID
    );
    res.status(200).json(messages);
  } catch (error) {
    console.error(
      "Error when sending a fetching conversation messages ",
      error
    );
    res.status(500).json({ error: "Internal server error." });
  }
};

// controller method for deleting a specified message
const deleteMessage = async (req, res) => {
  try {
    const tokenHeader = req.header("Authorization");
    const token = tokenHeader.split(" ")[1];
    if (!token) {
      // handles the case where the token is not present
      return res
        .status(401)
        .json({ error: "Unauthorized: JSON Web Token missing" });
    }

    // verifying json web token and obtaining client userID
    jwt.verify(token, process.env.JWT_SECRET);

    const { messageID } = req.body;
    await messageModel.deleteMessage(messageID);
    res
      .status(200)
      .json({ success: true, message: "message successfully deleted" });
  } catch (error) {
    console.error("Error when deleting specified message ", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// controller method allowing user to update message
const updateMessage = async (req, res) => {
  try {
    const tokenHeader = req.header("Authorization");
    const token = tokenHeader.split(" ")[1];
    if (!token) {
      // handles the case where the token is not present
      return res
        .status(401)
        .json({ error: "Unauthorized: JSON Web Token missing" });
    }

    // verifying json web token and obtaining client userID
    jwt.verify(token, process.env.JWT_SECRET);

    const { newMessageText, messageID } = req.body;
    await messageModel.updateMessage(messageID, newMessageText);
    res
      .status(200)
      .json({ success: true, message: "message successfully updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendMessage,
  fetchMessagesByConversation,
  deleteMessage,
  updateMessage,
};
