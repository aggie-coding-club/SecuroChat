const readReceiptsModel = require('../models/readReceiptsModel');

const readReceiptsController = {
    // Function to create a new read receipt
    createReadReceipt: async (req, res) => {
        try {
            const { messageId, userId } = req.body;
            const newReadReceipt = await readReceiptsModel.createReadReceipt(messageId, userId);
            res.status(201).json(newReadReceipt);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Function to retrieve read receipts for a message
    getReadReceiptsByMessageId: async (req, res) => {
        try {
            const { messageId } = req.params;
            const readReceipts = await readReceiptsModel.getReadReceiptsByMessageId(messageId);
            res.status(200).json(readReceipts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};