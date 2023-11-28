/* conversationController.js
 * Responsible for getting/altering conversation data within the database
*/

const jwt = require('jsonwebtoken');
const conversationModel = require('../models/conversationModel');
const userModel = require('../models/userModel');

