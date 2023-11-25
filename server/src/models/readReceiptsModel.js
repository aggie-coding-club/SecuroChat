/* readReceiptsModel.js
 * Defines database schema/model for read receipts table
*/

const db = require('../../database');

const readReceiptsModel = {
    // Function to create a new read receipt
    createReadReceipt: async (messageId, userId) => {
        const queryText = `
            INSERT INTO read_receipts(message_id, user_id)
            VALUES($1, $2)
            RETURNING *;
        `;
        try {
            const res = await db.query(queryText, [messageId, userId]);
            return res.rows[0];
        } catch (error) {
            throw error;
        }
    },

    // Function to retrieve read receipts for a message
    getReadReceiptsByMessageId: async (messageId) => {
        const queryText = `
            SELECT * FROM read_receipts
            WHERE message_id = $1;
        `;
        try {
            const res = await db.query(queryText, [messageId]);
            return res.rows;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = readReceiptsModel;