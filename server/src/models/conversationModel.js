/* conversationModel.js
 * Defines database schema/model for conversations table
*/
const db = require('../../database');
const userConversationModel = require('../models/userConversationsModel');
const messageModel = require('../models/messageModel');
const generalUtils = require('../utilities/generalUtils');

/**
 * Query responsible for creating conversations table
 * @returns {Promise<boolean>} returns true is successful, otherwise throws error
 */
const createConversationsTable = async () => {
    try {
        const queryText = ` 
            CREATE TABLE conversations (
                conversation_id SERIAL PRIMARY KEY,
                conversation_title VARCHAR(32) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                creator_id UUID NOT NULL REFERENCES users(user_id),
                is_direct_message BOOLEAN NOT NULL,
                last_message_id INT REFERENCES messages(message_id),
                num_participants INT NOT NULL,
                group_icon_color VARCHAR(7) NOT NULL
            );
        `;
        await db.query(queryText);
        return true;
    }
    catch {
        console.error('Error creating conversations table', error);
        throw error;
    }
};

/**
 * Query responsible for creating a new conversation. Query adds entry into conversations table and appropriate user entries within user_conversations join table
 * @param {string} creatorID - UUID of the creator of the conversation
 * @param {boolean} isDirectMessage - boolean representing whether the converation is a DM or not
 * @param {Array<string>} allParticipantID - array of strings containing conversation participant UUIDs
 * @returns {Promise<boolean>} Returns promise of true if successful. Otherwise throws error.
 */
const createConversation = async (creatorID, isDirectMessage, allParticipantID, messageContent) => {
    try {
        // uses transaction group to group multiple sql statements atomically
        // beginning the query transaction
        await db.query(`BEGIN`);

        // sql statement creating conversation entry
        const groupIconColor = generalUtils.randomColor();
        const conversationsQueryText = `
            INSERT INTO conversations(conversation_title, creator_id, is_direct_message, num_participants, group_icon_color)
            VALUES($1, $2, $3, $4, $5)
            RETURNING conversation_id, created_at
            ;
        `;

        // conversation_title is initally set to empty string and participants of conversation are displayed on the client-side by default
        // conversation_title can be changed by the user directly to make a conversation name which will be stored on the database as opposed to the default option
        const conversationsValues = ["", creatorID, isDirectMessage, allParticipantID.length, groupIconColor];
        const result = await db.query(conversationsQueryText, conversationsValues);
        const conversationID = result.rows[0].conversation_id;
        const timeMessageSent = result.rows[0].created_at;

        // creating first initial message in messages table
        const messageID = await messageModel.createMessage(creatorID, messageContent, conversationID, timeMessageSent);
        const messageQueryText = `
            UPDATE conversations
            SET last_message_id = $1
            WHERE conversation_id = $2
            ;
        `;
        const messageQueryValues = [messageID, conversationID];
        await db.query(messageQueryText, messageQueryValues);
        
        // sql statement adding all conversation participants to the user_conversations table
        await userConversationModel.addConversationParticipants(allParticipantID, conversationID);

        // committing the transaction
        await db.query(`COMMIT`);

        return true;
    } 
    catch (error) {
        // rolling query back if an error occurs
        await db.query(`ROLLBACK`);
        console.error('Error creating new conversation:', error);
        throw error;
    }
};

/**
 * Query responsible for altering the title of a conversation 
 * @param {string} conversationTitle - new title of the conversation
 * @param {string} conversationID - string representing ID of conversation
 * @returns {Promise<boolean>} - Returns a promise of true if successful. Otherwise throws an error.
 */
const alterConversationTitle = async (conversationTitle, conversationID) => {
    try {
        const queryText = `
            UPDATE conversations
            SET conversation_title = $1
            WHERE conversation_id = $2
            ;
        `;
        const values = [conversationTitle, conversationID];
        await db.query(queryText, values);
        return true;
    } 
    catch (error) {
        console.error('Error altering the conversation title:', error);
        throw error;
    }
};


/**
 * Query responsible for deleting conversation from specified conversationID. Ensures to delete entries in dependent tables like users_conversations and messages as well
 * @param {string} conversationID - string representing conversation ID
 * @returns {Promise<boolean>} - Returns promise of true if successful. Otherwise throws an error.
 */
const deleteConversation = async (conversationID) => {
    try {
        // makes use of ON DELETE CASCADE to delete conversations table entry ensuring dependent entries in other tables are also altered
        // conversations dependent tables are: users_conversations, messages
        // causes changes in message dependent tables such as: attachments, read_receipts, and notifications

        const queryText = `
            DELETE FROM conversations
            WHERE conversation_id = $1
            ;
        `;
        const values = [conversationID];
        await db.query(queryText, values);
        return true;
    } 
    catch (error) {
        console.error('Error deleting the specified conversation', error);
        throw error;
    }
};

/**
 * Query responsible for retrieving last message of conversation
 * @param {string} conversationID - string representing ID of conversation
 * @returns {Promise<string>} - Returns a promise of a string if successful. Otherwise throws an error.
 */
const getLastMessageOfConversation = async (conversationID) => {
    try {
        const queryText = `
            SELECT messages_text FROM messages
            JOIN conversations ON conversations.last_message_id = messages.message_id
            WHERE conversations.conversation_id = $1
            ;
        `;
        const values = [conversationID];
        const result = await db.query(queryText, values);
        return result.rows[0];
    } 
    catch (error) {
        console.error('Error fetching last message of conversation:', error);
        throw error;
    }
};

/**
 * Query responsible for returning object data from a specific conversation ID
 * @param {string} userID - string uuid of client
 * @param {string} conversationID - string representing conversation ID
 * @returns {Promise<Object>} - promise of an object if successful. Otherwise throws an error
 */
const getConversationData = async (userID, conversationID) => {
    try {
        const queryText = `
            SELECT 
                c.conversation_id,
                c.conversation_title,
                c.updated_at AT TIME ZONE 'UTC' AS updated_at,
                m.messages_text AS last_message,
                u.icon_color AS creator_icon_color,
                u.username AS creator_username,
                c.is_direct_message, 
                c.group_icon_color AS conversation_icon_color
            FROM
                conversations c
            JOIN
                users_conversations uc ON uc.conversation_id = c.conversation_id
            JOIN
                messages m ON c.last_message_id = m.message_id
            JOIN
                users u ON c.creator_id = u.user_id
            WHERE 
                c.conversation_id = $1
            ;
        `;
        const values = [conversationID];
        const result = await db.query(queryText, values);
        const resultRow = result.rows[0];

        // creating conversation object for specified conversation
        const conversationParticipants = await userConversationModel.getConversationParticipants(resultRow.conversation_id);
        const messagesData = await messageModel.getMessagesByConversation(resultRow.conversation_id);
        // creating array of conversation participant IDs to determine conversation status
        const conversationParticipantIDs = [];
        for (let item of conversationParticipants) {
            if (item.userID !== userID) {
                conversationParticipantIDs.push(item.userID);
            }
        }
        const onlineConversationStatus = await userConversationModel.checkConversationOnlineStatus(userID, conversationParticipantIDs);
        const conversationObject = {
            conversation_id: resultRow.conversation_id,
            conversation_title: resultRow.conversation_title,
            updated_at: resultRow.updated_at,
            messages_text: resultRow.last_message,
            creator_icon_color: resultRow.creator_icon_color,
            creator_username: resultRow.creator_username,
            is_direct_message: resultRow.is_direct_message,
            conversation_participants: conversationParticipants,
            conversation_icon_color: resultRow.conversation_icon_color,
            messagesData: messagesData,
            onlineConversationStatus: onlineConversationStatus,
        };

        return conversationObject;
    } 
    catch (error) {
        console.error('Error when fetching user conversations', error);
        throw error;    
    }
};

module.exports = {
    createConversation,
    alterConversationTitle,
    deleteConversation,
    getLastMessageOfConversation,
    getConversationData,
};