/* conversationController.js
 * Responsible for getting/altering conversation data within the database
*/

const jwt = require('jsonwebtoken');
const conversationModel = require('../models/conversationModel');
const userModel = require('../models/userModel');
const userConversationModel = require('../models/userConversationsModel');

// controller method creating new conversation
const createNewConversation = async (req,res) => {
    try {
        const tokenHeader = req.header('Authorization');
        const token = tokenHeader.split(' ')[1];
        if (!token) {
            // handles the case where the token is not present
            return res.status(401).json({ error: 'Unauthorized: JSON Web Token missing' });
        }

        // verifying json web token and obtaining client userID
        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);

        // obtain userID of all participants of conversation

        // create the conversation entry in conversation table itself

        // add conversation's participants into the users_conversations table


    } 
    catch (error) {
        console.error('Error when creating new conversation ', error);
        res.status(500).json({ error: 'Internal server error.'});
    }
};

// controller method for fetching a user's conversations
const fetchUserConversations = async (req,res) => {
    try {
        const tokenHeader = req.header('Authorization');
        const token = tokenHeader.split(' ')[1];
        if (!token) {
            // handles the case where the token is not present
            return res.status(401).json({ error: 'Unauthorized: JSON Web Token missing' });
        }

        // verifying json web token and obtaining client userID
        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);

        // obtaining conversations in which user is a part of
        const userConversations = await userConversationModel.getUserConversations(decodedJWT.userID);
        res.status(200).json(userConversations);
    }
    catch (error) {
        console.error('Error when fetching user conversations ', error);
        res.status(500).json({ error: 'Internal server error.'});
    }
};


module.exports = {
    createNewConversation,
    fetchUserConversations,
};
