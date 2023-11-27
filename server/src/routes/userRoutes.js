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

// Route for rejecting friend request
router.delete('/rejectFriendRequest', userController.rejectFriendRequest);

// Route for accepting friend request
router.post('/acceptFriendRequest', userController.acceptFriendRequest);

module.exports = router;