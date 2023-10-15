const express = require('express');
const router = express.Router();

// Mock function to get user public key
router.get('/:userID/publicKey', (req, res) => {
    const userID = req.params.userID;

    // In a real app, fetch the public key for the user from the database.
    const publicKey = 'some_mock_public_key';

    res.json({ userID, publicKey });
});

module.exports = router;
