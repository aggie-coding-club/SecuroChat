/* userConversationsModel.js
 * Defines database schema/model for userConversationsModel which is the join between users table and conversations table
*/

const db = require('../../database');

/**
 * Query responsible for creating user_conversations table
 * @returns {Promise<boolean>} returns true is successful, otherwise throws error
 */
const createUserConversations = async () => {
    try {
        const queryText = `
            CREATE TABLE users_conversations (
                participant_id SERIAL PRIMARY KEY,
                user_id UUID NOT NULL REFERENCES users(user_id),
                conversation_id INT NOT NULL REFERENCES conversations(conversation_id)
            );        
        `;
        await db.query(queryText);
        return true;
    } 
    catch (error) {
        console.error('Error creating new userConversation table', error);
        throw error;
    }
};

/**
 * Query responsible for fetching all of a conversations participants
 * @param {string} conversationID - number representing ID of conversation
 * @returns {Promise<Array>} - promise of an array containing participant data. Otherwise results in an error
 */
const getAllConversationParticipants = async (conversationID) => {
    try {
        const queryText = `
            SELECT users.user_id, users.username
            FROM users_conversations
            JOIN users ON users_conversations.user_id = users.user_id
            WHERE conversation_id = $1
            ;
        `;
        const values = [conversationID];
        const result = await db.query(queryText, values);

        // creating object array containing information of conversations participants
        const conversationParticipantData = [];
        for (let participant of result.rows) {
            const participantObject = {
                userID: participant.user_id,
                username: participant.username,
            };
            conversationParticipantData.push(participantObject);
        }

        // returning conversation participant data
        return conversationParticipantData;
    } 
    catch (error) {
        console.error('Error fetching participants from users_conversations', error);
        throw error;
    }
};

/**
 * Query responsible for adding all partipants to the users_conversations table
 * @param {Array<string>} conversationParticipantsID - array of string containing all the userID's of the participants of the new conversation
 * @param {number} conversationID - number representing the ID of the conversation
 * @returns {Promise<boolean>} - returns promise of boolean true if successful, else throws an error
 */
const addAllConversationParticipants = async (conversationParticipantsUserID, conversationID) => {
    try {
        const values = conversationParticipantsUserID.map((item) => `(${item}, ${conversationID})`).join(', ');
        const queryText = `
            INSERT INTO users_conversations (user_id, conversation_id)
            VALUES ${values}
            ;
        `;
        await db.query(queryText);
        return true;
    } 
    catch (error) {
        console.error('Error adding participants to new conversation', error);
        throw error;
    }
};

/**
 * Query responsible for removing all entries belonging to a conversation within users_conversations table 
 * @param {number} conversationID - number representing ID of the conversation
 * @returns {Promise<boolean>} - returns promise of boolean true if successful, else throws an error
 */
const deleteAllConversationParticipants = async (conversationID) => {
    try {
        const queryText = `
            DELETE FROM users_conversations
            WHERE conversation_id = $1
            ;
        `;
        const values = [conversationID];
        await db.query(queryText, values);
        return true;
    } 
    catch (error) {
        console.error('Error when removing all participants from users conversations', error);
        throw error;
    }
};

/**
 * Query responsible for removing a specified user from a conversation
 * @param {string} participantUserID - string representing UUID of conversation participant being removed from conversation
 * @param {number} conversationID - number representing the ID of the conversation
 * @returns {Promise<boolean>} - returns promise of boolean true if successful, else throws an error
 */
const removeParticipantFromConversation = async (participantUserID, conversationID) => {
    try {
        const queryText = `
            DELETE FROM users_conversations
            WHERE user_id = $1 AND conversation_id = $2
            ;
        `;
        const values = [participantUserID, conversationID];
        await db.query(queryText, values);
        return true;
    } 
    catch (error) {
        console.error('Error when removing specific user from conversation', error);
        throw error;     
    }
};

/**
 * Query responsible for adding specified user to conversation
 * @param {string} participantUserID - string representing UUID of conversation participant being removed from conversation
 * @param {number} conversationID - number representing the ID of the conversation
 * @returns {Promise<boolean>} - returns promise of boolean true if successful, else throws an error
 */
const addParticipantToConversation = async (participantUserID, conversationID) => {
    try {
        const queryText = `
            INSERT INTO users_conversations (user_id, conversation_id)
            VALUES ($1, $2)
            ;
        `;
        const values = [participantUserID, conversationID];
        await db.query(queryText, values);
        return true;
    } 
    catch (error) {
        console.error('Error when adding specific user to conversation', error);
        throw error;     
    }
};



module.exports = {
    addAllConversationParticipants,
    deleteAllConversationParticipants,
    removeParticipantFromConversation,
    addParticipantToConversation,
    getAllConversationParticipants,
};