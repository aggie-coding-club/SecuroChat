/* readReceiptsController.js
 * responsible for sending and receiving creating and retrieving read receipts for messages
 */

const jwt = require("jsonwebtoken");
const readReceiptsModel = require("../models/readReceiptsModel");

// controller method for marking messages are read
const markMessagesAsRead = async (req, res) => {
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
    const { conversationID } = req.body;

    await readReceiptsModel.createReadReceipt(
      decodedJWT.userID,
      conversationID
    );
    res
      .status(200)
      .json({ success: true, message: "successfully marked messages as read" });
  } catch (error) {
    console.error("Error when mariking message as read on the server ", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  markMessagesAsRead,
};
