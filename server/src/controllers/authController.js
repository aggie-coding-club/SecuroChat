/* authController.js
 * Responsible for managing user registration and login
 * Generates and returns JSON Web Token upon registration/login
*/

const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const passwordUtils = require('../utilities/passwordUtils');
const generalUtils = require('../utilities/generalUtils');
const authenticationModel = require('../models/authenticationModel');
const userModel = require('../models/userModel');

// controller method for user registration
const register = async (req, res) => {
    try {
        const { username, password, phone, publicKey } = req.body;

        // hashing and salting the requested password
        const hashedPassword = await passwordUtils.hashPassword(password);

        // generating random default icon color
        const iconColor = generalUtils.randomColor();

        // generating UUID for user and ensuring it is unique
        let generatedUUID = null;
        do {
            generatedUUID = uuidv4();
        } 
        while (!(await userModel.isUniqueUUID(generatedUUID)));

        // creating new user within the database by creating new entry in users and authentication tables
        if (await userModel.isUniqueUser(username, phone)) {
            await userModel.createUserEntry(generatedUUID, username, phone, iconColor);
            await authenticationModel.createAuthenticationEntry(generatedUUID, hashedPassword, publicKey);
        }
        else {
            throw new Error("Error: User with these credentials already exists");
        }

        // creating json web token for new user
        const token = jwt.sign({ userID: generatedUUID }, process.env.JWT_SECRET);

        // sending the token to client in response
        res.json({ token, iconColor })
    } 
    catch (error) {
        console.error('Error in user registration: ', error);
        res.status(500).json({ error: 'Internal server error.'});
    }
};

// controller method for user login
const login = async (req, res) => {
    try {
        // extracting user login data from request
        const { username, password } = req.body;
        
        // calling model methods to authenticate user
        const userAuthenticated = await authenticationModel.authenticateUser(username, password);
        if (!userAuthenticated) {
            return res.status(401).json(( {error: 'Invalid username and/or password' }));
        }

        // generating json web token for authenticated user
        const userInfo = await userModel.getUserInfo(username);
        const token = jwt.sign({ userID: userInfo.userID }, process.env.JWT_SECRET);

        // sending the token to client in response
        const iconColor = userInfo.iconColor;
        res.json({ token, iconColor });
    } 
    catch (error) {
        console.error('Error in user login: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    register,
    login,
};