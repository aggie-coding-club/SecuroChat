/* conversationController.js
 * Responsible for getting/altering conversation data within the database
 */

const jwt = require("jsonwebtoken");
const conversationModel = require("../models/conversationModel");
const userConversationModel = require("../models/userConversationsModel");
const messageModel = require("../models/messageModel");

// controller method creating new conversation
const createNewConversation = async (req, res) => {
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

    // obtain userData of all participants of conversation
    const { allParticipantData, messageText } = req.body;
    const allParticipantUserID = [];
    for (let item of allParticipantData) {
      allParticipantUserID.push(item.userID);
    }
    allParticipantUserID.push(decodedJWT.userID);

    // determining if conversation is a direct message
    const isDirectMessage = allParticipantUserID.length === 2 ? true : false;

    // querying conversations model creating new converstion and adding its participants
    await conversationModel.createConversation(
      decodedJWT.userID,
      isDirectMessage,
      allParticipantUserID,
      messageText
    );

    res
      .status(200)
      .json({ success: true, message: "successfully created conversation" });
  } catch (error) {
    console.error("Error when creating new conversation ", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// controller method for fetching a user's conversations
const fetchUserConversations = async (req, res) => {
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

    // obtaining conversations in which user is a part of
    const userConversations = await userConversationModel.getUserConversations(
      decodedJWT.userID
    );

    res.status(200).json(userConversations);
  } catch (error) {
    console.error("Error when fetching user conversations ", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// controller method for determining whether a conversation already exists or not
const conversationExists = async (req, res) => {
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

    // obtain userData of all selected participants
    const { selectedParticipants } = req.query;
    const selectedParticipantIDS = new Set();
    for (let item of selectedParticipants) {
      selectedParticipantIDS.add(item.userID);
    }
    selectedParticipantIDS.add(decodedJWT.userID);

    // determining if conversation already exists
    const conversationID = await userConversationModel.doesConversationExist(
      decodedJWT.userID,
      selectedParticipantIDS
    );

    // obtaining conversation data if conversation already exists
    let conversationObject = null;
    if (conversationID) {
      conversationObject = await conversationModel.getConversationData(
        decodedJWT.userID,
        conversationID
      );
    }
    res.status(200).json(conversationObject);
  } catch (error) {
    console.error("Error when determining if conversation exists ", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const fetchConversationOnlineStatus = async (req, res) => {
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

    // obtaining data regarding conversation
    const { conversationParticipants, conversationID } = req.query;
    const conversationIDs = [];
    for (let item of conversationParticipants) {
      if (item !== decodedJWT.clientID) {
        conversationIDs.push(item.userID);
      }
    }

    // collecting data from database
    const isConversationOnline =
      await userConversationModel.checkConversationOnlineStatus(
        decodedJWT.userID,
        conversationIDs
      );

    res.status(200).json({ isConversationOnline: isConversationOnline });
  } catch (error) {
    console.error("Error when fetching conversation state ", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  createNewConversation,
  fetchUserConversations,
  conversationExists,
  fetchConversationOnlineStatus,
};
