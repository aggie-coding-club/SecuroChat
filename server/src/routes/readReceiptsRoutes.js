/* readReceipts.js
 * Configures API routes for readReceipt operations
 */

const express = require("express");
const readReceiptsController = require("../controllers/readReceiptsController");
const router = express.Router();

// create a new read receipt
router.post("/markMessagesAsRead", readReceiptsController.markMessagesAsRead);

module.exports = router;
