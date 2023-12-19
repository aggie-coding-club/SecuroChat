/* userController.js
 * Responsible for managing user-related operations such as fetching user/friend profiles
 * Responsible for handling friend requests and relationships between users
*/

const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const friendModel = require('../models/friendModel');

// controller for sending friend request
const sendFriendRequest = async (req, res) => {
    try {
        const tokenHeader = req.header('Authorization');
        const token = tokenHeader.split(' ')[1]; // obtaining the actual token
        if (!token) {
            // handles the case where the token is not present
            return res.status(401).json({ error: 'Unauthorized: JSON Web Token missing' });
        }

        // verifying json web token and obtaining sender userID
        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);

        const { recipientUsername} = req.body;

        // retrieving the userID from recipientUsername 
        const recipientInfo = await userModel.getUserInfo(recipientUsername);
        if (!recipientInfo.userID) {
            return res.status(404).json({error: 'inputted username does not exist'});
        }

        // creating friend request
        await friendModel.sendFriendRequest(recipientInfo.userID, decodedJWT.userID);
        res.status(200).json({success: true, message: 'successfully sent friend request'});
    } 
    catch (error) {
        console.log(`Error occured in sendFriendRequest controller: ${error}`);
        res.status(500).json({ error: 'Internal server error.'});
    }
};

// controller for fetching friend data
const fetchFriendData = async (req, res) => {
    try {
        const tokenHeader = req.header('Authorization');
        const token = tokenHeader.split(' ')[1]; // gets token itself

        if (!token) {
            // handles the case where the token is not present
            return res.status(401).json({ error: 'Unauthorized: JSON Web Token missing' });
        }

        // verifying json web token and obtaining sender userID
        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);

        const friendData = await friendModel.getUserFriendData(decodedJWT.userID);
        res.status(200).json(friendData);
    } 
    catch (error) {
        console.log(`Error occured fetching user's friends data`);
        res.status(500).json({ error: `Internal server error.`});
    }
};

// controller for fetching all of users current friend's data
const fetchAllCurrentFriendData = async (req, res) => {
    try {
        const tokenHeader = req.header('Authorization');
        const token = tokenHeader.split(' ')[1];

        if (!token) {
            // handles the case where the token is not present
            return res.status(401).json({ error: 'Unauthorized: JSON Web Token missing' });
        }

        // verifying json web token and obtaining sender userID
        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);

        const friendUsernames = await friendModel.getAllCurrentUserFriends(decodedJWT.userID);
        res.status(200).json(friendUsernames);
    } 
    catch (error) {
        console.log(`Error occured fetching user's fetching all of user's friend's usernames`);
        res.status(500).json({ error: `Internal server error.`});
    }
};

// controller for rejecting a received friend request
const rejectFriendRequest = async (req, res) => {
    try {
        const tokenHeader = req.header('Authorization');
        const token = tokenHeader.split(' ')[1];

        if (!token) {
            // handles the case where the token is not present
            return res.status(401).json({ error: 'Unauthorized: JSON Web Token missing' });
        }

        const { senderUsername } = req.body;

        // retrieving ID from senderUsername
        const senderInfo = await userModel.getUserInfo(senderUsername);
        if (!senderInfo.userID) {
            return res.status(404).json({error: 'sender does not exist'});
        }

        // verifying json web token and obtaining sender userID
        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
        await friendModel.rejectFriendRequest(decodedJWT.userID, senderInfo.userID);

        res.status(200).json({success: true, message: 'successfully rejected friend request'});
    } 
    catch (error) {
        console.log(`Error occured while rejecting friend request`);
        res.status(500).json({ error: `Internal server error.`});
    }
};

// controller for accepting a received friend request
const acceptFriendRequest = async (req, res) => {
    try {
        const tokenHeader = req.header('Authorization');
        const token = tokenHeader.split(' ')[1];
        if (!token) {
            // handles the case where the token is not present
            return res.status(401).json({ error: 'Unauthorized: JSON Web Token missing' });
        }
        
        const { senderUsername } = req.body;
        // retrieving ID from senderUsername
        const senderInfo = await userModel.getUserInfo(senderUsername);
        if (!senderInfo.userID) {
            return res.status(404).json({error: 'sender does not exist'});
        }

        // verifying json web token and obtaining sender userID
        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
        await friendModel.acceptFriendRequest(decodedJWT.userID, senderInfo.userID);
        res.status(200).json({success: true, message: 'successfully accepted friend request'});
    } 
    catch (error) {
        console.log(`Error occured accepting friend request`);
        res.status(500).json({ error: `Internal server error.`});
    }
};

module.exports = {
    sendFriendRequest,
    fetchAllCurrentFriendData,
    fetchFriendData,
    rejectFriendRequest,
    acceptFriendRequest,
};