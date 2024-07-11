/* readReceiptsModel.js
 * Defines database schema/model for read receipts table
 */

const db = require("../../database");

/**
 * Query responsible for creating the read receipts table
 * @returns {Promise<boolean>} - Returns promise of true if successful. Otherwise throws an error
 */
const createReadReceiptTable = async () => {
  try {
    const queryText = `
            CREATE TABLE read_receipts(
                read_receipts_id SERIAL PRIMARY KEY,
                user_id UUID NOT NULL REFERENCES users(user_id),
                message_id INT NOT NULL REFERENCES messages(message_id) ON DELETE CASCADE,
                time_read TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `;
    await db.query(queryText);
    return true;
  } catch (error) {
    console.error("Error creating read receipts table", error);
    throw error;
  }
};

// /**
//  * Query responsible for marking messages as read
//  * @param {string} userID - string representing client uuid
//  * @param {Array<string>} messageIDs - array of string message IDs that were read
//  * @param {string} time_read - time messages were read
//  * @returns {Promise<boolean>} - Returns promise of true if successful, otherwise throws an error
//  */
// const createReadReceipt = async (userID, messageIDs, timeRead) => {
//     try {
//         const insertedValues = messageIDs.map((_, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`).join(',');
//         const queryText = `
//             INSERT INTO
//                 read_receipts (user_id, message_id, time_read)
//             VALUES
//                 ${insertedValues}
//             ;
//         `;
//         const values = [userID, messageIDs, timeRead];
//         await db.query(queryText, values);

//         return true;
//     }
//     catch (error) {
//         console.error('Error creating read receipts entry', error);
//         throw error;
//     }
// };

/**
 * Query responsible for marking messages as read for specified user and conversation
 * @param {string} userID - client uuid
 * @param {string} conversationID - string representing conversation ID
 * @returns {Promise<boolean>} - Returns promise of true if successful. Otherwise throws an error
 */
const createReadReceipt = async (userID, conversationID) => {
  try {
    const queryText = `
            INSERT INTO 
                read_receipts (user_id, message_id)
            SELECT
                $1,
                m.message_id
            FROM   
                messages m
            WHERE   
                m.conversation_id = $2
                AND NOT EXISTS (
                    SELECT 1
                    FROM read_receipts r
                    WHERE r.message_id = m.message_id
                    AND r.user_id = $1
                )
                AND m.user_id != $1
            ;
        `;
    const values = [userID, conversationID];
    await db.query(queryText, values);

    return true;
  } catch (error) {
    console.error("Error creating read receipts entry", error);
    throw error;
  }
};

/**
 * Query responsible for discovering how many unread messages a user has for a conversation
 * @param {string} userID - client uuid
 * @param {string} conversationID - string representing conversation ID
 * @returns {Promise<number>} - Returns a promise of a number if successful. Otherwise throws an error.
 */
const getUnreadMessageCount = async (userID, conversationID) => {
  try {
    const queryText = `
            SELECT 
                COUNT(DISTINCT m.message_id) AS unread_count
            FROM    
                messages m
            WHERE
                m.message_id NOT IN (
                    SELECT rc.message_id
                    FROM read_receipts rc
                    WHERE rc.user_id = $1
                )
                AND m.conversation_id = $2
                AND m.user_id != $1
            ;
        `;
    const values = [userID, conversationID];
    const response = await db.query(queryText, values);

    return response.rows.length > 0
      ? parseInt(response.rows[0].unread_count, 10)
      : 0;
  } catch (error) {
    console.error("Error creating getting unread message count", error);
    throw error;
  }
};

module.exports = {
  createReadReceipt,
  getUnreadMessageCount,
};
