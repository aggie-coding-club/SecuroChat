/* userConversationsModel.js
 * Defines database schema/model for userConversationsModel which is the join between users table and conversations table
*/

const db = require('../../database');
/**
 * creates user Conversations model to display all chats with different friends
 * @returns {Promise<boolean>} Returns promise of true is successful. Otherwise throws error
 */
const createUserConversationsModel = async() =>{
    try{
        const queryText = `
            CREATE TABLE userConversations (
                participant_id SERIAL PRIMARY KEY,
                user_id UUID NOT NULL REFERENCES users(user_id),
                conversation_id INT NOT NULL REFERENCES conversations(conversation_id)
            );
        `;
        await db.query(queryText);
        return true;
    }
    catch(error){
        console.log('Failed to create User Conversations table');
        throw error;
    }
};

/**
 * Creates user conversation model with specified params
 * @param {participantID} - represents the friends id
 * @param {userID} - represents the users ID
 * @param {conversationID} - represents the conversationID
 * @returns {Promise<boolean>} Returns promise of true is successful. Otherwise throws error
 */
const createUserConversationsEntry = async (participantID, userID, conversationID) => {
    try{
        const queryText = `
            INSERT INTO userConversations (participant_id, user_id, conversation_id)
            VALUES (
                $1,
                $2,
                $3
            );
        `;
        const values = [participantID,userID, conversationID];
        await db.query(queryText, values);
        return true;
    }
    catch(error){
        console.log('Failed to create new user conversation entry');
        throw error;
    }
};
/**
 * deletes userConversation using their userID and conversationID
 * @param {*} conversationID represents conversation_id
 * @returns {Promise<boolean>} Returns promise of true is successful. Otherwise throws error
 */
const deleteUserConversationEntry = async (conversationID) => {
    try{
        const queryText = `
            DELETE FROM userConversations
            WHERE conversation_id = $1;
        `;
        const values = [conversationID];
        await db.query(queryText, values);
        return true;
    }
    catch(error){
        console.log('Failed to delete user conversation from userConversations table');
        throw error;
    }
};
/**
 * retrieves conversationID using participant ID and user ID
 * @param {*} participantID represents participant_id
 * @param {*} userID represents user_id
 * @returns conversation ID
 */
const getConversationID =  async (participantID, userID) => {
    try {
        const queryText = `
            SELECT conversation_id FROM userConversations
            WHERE participant_id = $1 AND user_id = $2;
        `;
        const values = [participantID, userID];
        const result = await db.query(queryText, values);
        const conversationID = result.rows[0].conversation_id.toString();
        return conversationID;
    }
    catch (error){
        console.log('Failed to retrieve conversationID');
        throw error;
    }
};

module.exports = {
    createUserConversationsModel,
    createUserConversationsEntry,
    deleteUserConversationEntry,
    getConversationID,
}
adsfsdf
sdfasfds
dfasdf
