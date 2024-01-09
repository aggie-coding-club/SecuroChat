/* userRoutes.js
 * Sets up API routes for user-related operations
*/

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for sending a friend request
router.post('/sendFriendRequest', userController.sendFriendRequest);

// Route for fetching friend data
router.get('/fetchFriendData', userController.fetchFriendData);

// Route for fetching all of user's current friend's usernames
router.get('/fetchAllCurrentFriendData', userController.fetchAllCurrentFriendData);

// Route for rejecting friend request
router.delete('/rejectFriendRequest', userController.rejectFriendRequest);

// Route for accepting friend request
router.post('/acceptFriendRequest', userController.acceptFriendRequest);

// Route for updating user's online status
router.put('/updateUserOnlineStatus', userController.updateUserOnlineStatus);

module.exports = router;