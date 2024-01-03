/* userConversationsModel.js
 * Defines database schema/model for userConversationsModel which is the join between users table and conversations table
*/

const db = require('../../database');
const messageModel = require('../models/messageModel');

/**
 * Query responsible for creating user_conversations table
 * @returns {Promise<boolean>} returns true is successful, otherwise throws error
 */
const createUserConversationsTable = async () => {
    try {
        const queryText = `
            CREATE TABLE users_conversations (
                participant_id SERIAL PRIMARY KEY,
                user_id UUID NOT NULL REFERENCES users(user_id),
                conversation_id INT NOT NULL REFERENCES conversations(conversation_id) ON DELETE CASCADE
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
const getConversationParticipants = async (conversationID) => {
    try {
        const queryText = `
            SELECT users.user_id, users.username, users.icon_color
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
                iconColor: participant.icon_color,
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
 * @param {string} conversationID - string representing the ID of the conversation
 * @returns {Promise<boolean>} - returns promise of boolean true if successful, else throws an error
 */
const addConversationParticipants = async (conversationParticipantsUserID, conversationID) => {
    try {
        // const values = conversationParticipantsUserID.map((item) => `(${item}, ${conversationID})`).join(', ');
        const values = conversationParticipantsUserID.map((item, index) => `($${2 * index + 1}::uuid, $${2 * index + 2}::integer)`).join(', ');
        const queryText = `
            INSERT INTO users_conversations (user_id, conversation_id)
            VALUES ${values}
            ;
        `;
        const queryValues = conversationParticipantsUserID.reduce((acc, item) => {
            acc.push(item, conversationID);
            return acc;
        }, []);

        await db.query(queryText, queryValues);
        return true;
    } 
    catch (error) {
        console.error('Error adding participants to new conversation', error);
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
 * Query responsible for fetching user conversation data
 * @param {string} userID - user's UUID to fetch user conversation data for
 * @returns {Promise<Array>} - Returns promise of an object array containing user's conversation data
 */
const getUserConversations = async (userID) => {
    // I need the following to generate user conversations
    // - conversation title
    // - last message text
    // - updated at
    // - conversation icon
    // - read status ***FIX ME: ADD IN THE FUTURE***
    try {
        // uses transaction group to group multiple sql statements atomically
        // beginning the query transaction
        await db.query(`BEGIN`);

        const queryText = `
            SELECT 
                c.conversation_id,
                c.conversation_title,
                c.updated_at AT TIME ZONE 'UTC' AS updated_at,
                m.messages_text AS last_message,
                u.icon_color AS creator_icon_color,
                u.username AS creator_username,
                c.is_direct_message, 
                c.group_icon_color
            FROM
                conversations c
            JOIN
                users_conversations uc ON uc.conversation_id = c.conversation_id
            JOIN
                messages m ON c.last_message_id = m.message_id
            JOIN
                users u ON c.creator_id = u.user_id
            WHERE 
                uc.user_id = $1
            ORDER BY
                updated_at DESC
            ;
        `;
        const values = [userID];
        const result = await db.query(queryText, values);

        const userConversations = [];
        for (let row of result.rows) {
            const conversationParticipants = await getConversationParticipants(row.conversation_id);
            const messagesData = await messageModel.getMessagesByConversation(row.conversation_id);
            const conversationObject = {
                conversation_id: row.conversation_id, 
                conversation_title: row.conversation_title, 
                updated_at: row.updated_at,
                messages_text: row.last_message,
                creator_icon_color: row.creator_icon_color,
                creator_username: row.creator_username,
                is_direct_message: row.is_direct_message,
                conversation_participants: conversationParticipants,
                conversation_icon_color: row.group_icon_color,
                messagesData: messagesData,
            };
            userConversations.push(conversationObject);
        }

        // committing the transaction
        await db.query(`COMMIT`);
        return { userConversations };
    } 
    catch (error) {
        // rolling query back if an error occurs
        await db.query(`ROLLBACK`);
        console.error('Error when fetching user conversations', error);
        throw error;    
    }
};

/**
 * Query responsible for determining whether a conversation exists or not. If such a conversation does exist, its data is collected.
 * @param {string} userID - string representing client's uuid
 * @param {Set<string>} selectedParticipantIDS - array of all participant string UUIDs
 * @returns {Promise<string>} - Returns a promise of a string containing conversation id of successful. Else returns an empty string
 */
const doesConversationExist = async (userID, selectedParticipantIDS) => {
    try {
        const queryText = `
            SELECT
                conversation_id,
                COUNT(DISTINCT participant_id) AS total_users,
                ARRAY_AGG(user_id) AS conversation_participants
            FROM 
                users_conversations
            WHERE
                conversation_id IN (
                    SELECT DISTINCT conversation_id
                    FROM users_conversations
                    WHERE user_id = $1
                )
            GROUP BY
                conversation_id
            ;
        `;
        const values = [userID];
        const response = await db.query(queryText, values);
        // obtaining appropriate conversation_id of pre-existing conversation if one exists
        for (let row of response.rows) {
            if (row.total_users === selectedParticipantIDS.size.toString()) {
                // ensuring that all participants in conversation match participants in selectedParticipantIDS
                let conversationFound = true;
                for (let entry of row.conversation_participants) {
                    if (!selectedParticipantIDS.has(entry)) {
                        conversationFound = false;
                        break;
                    }
                }
                if (conversationFound) {
                    return row.conversation_id;
                }
            }
        }
        return null;
    } 
    catch (error) {
        console.error('Error when determining if conversation exists', error);
        throw error;    
    }
};



module.exports = {
    addConversationParticipants,
    removeParticipantFromConversation,
    getConversationParticipants,
    getUserConversations,
    doesConversationExist,
};