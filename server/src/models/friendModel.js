/* friendModel.js
 * Defines database schema/model for friends table
*/

const db = require('../../database');

/**
 * Creates friends table responsible of managing data for friendships within securochat
 * @returns {Promise<boolean>} Returns promise of true is successful. Otherwise throws error
 */
const createFriendsModel = async () => {
    try {
        const queryText = `
            CREATE TABLE friends (
                friendship_id SERIAL PRIMARY KEY, --made SERIAL to increase by default
                user_id UUID NOT NULL REFERENCES users(user_id),
                friend_id UUID NOT NULL REFERENCES users(user_id),
                status BOOLEAN NOT NULL,
                UNIQUE(user_id, friend_id) --ensures that only unique tuples of (user_id, friend_id) can be added
            );
        `;
        await db.query(queryText);
        return true;
    } 
    catch (error) {
        console.log(`Failed to create Friends Table`);
        throw error;
    }
};

/**
 * Query responsible for retrieving all of the specified users friend data including those who are current friends and those who are requests
 * @param {string} userID - string representing UUID for the user
 * @returns {Promise<Object>} - returns promise of javascript object containing 
 */
const getUserFriendData = async (userID) => {
    try {
        const queryText = `
            SELECT users.user_id AS friend_user_id, users.username AS friend_username, users.last_online, friends.status
            FROM friends
            JOIN users ON friends.friend_id = users.user_id
            WHERE friends.user_id = $1
            ;
        `;
        const values = [userID];
        const result = await db.query(queryText, values);
        const friendRequests = [];
        const onlineFriends = [];
        const offlineFriends = [];

        const currentTime = new Date(); 
        
        // iterating through rows of result populating arrays
        for (const row of result.rows) {
            const friendObject = {
                friendID: row.friend_user_id,
                friendUsername: row.friend_username,
                friendLastOnline: row.last_online,
            };
            
            if (row.status) {
                if (row.last_online) {
                    const lastOnlineTime = new Date(row.last_online);
                    const timeDifference = currentTime - lastOnlineTime;
                    const minutesSinceLastOnline = timeDifference / (1000 * 60);
    
                    // assuming thresholds of 10 minutes for online status
                    if (minutesSinceLastOnline <= 10) {
                        onlineFriends.push(friendObject);
                    }
                    else {
                        offlineFriends.push(friendObject);
                    }
                }
            }
            else {
                friendRequests.push(friendObject);
            }
        }

        return {
            friendRequests,
            onlineFriends,
            offlineFriends,
        };
    } 
    catch (error) {
        console.log(`Failed to retrieve users friend data`);
        throw error;
    }
};

/**
 * Query resposible for storing friend request on recipient side of friends tbale in the database. Used when sending a friend request
 * @param {string} recipientUserID - string represening recipients UUID
 * @param {string} senderUserID - string representing sender's UUID
 * @returns {Promsie<boolean>} - returns promise of true if successful. Else throws error.
 */
const sendFriendRequest = async (recipientUserID, senderUserID) => {
    try {
        // stores friend request on recipient side of database as friend request will appear on the recipients interface, not the senders
        const queryText = `
            INSERT INTO friends (user_id, friend_id, status)
            VALUES ($1, $2, false)
            ;
        `;
        const values = [recipientUserID, senderUserID];
        await db.query(queryText, values);
        return true;
    } 
    catch (error) {
        console.log(`Failed to send friend request`);
        throw error;
    }
};

/**
 * Query responsible for rejecting friend request on recipient side of friends table in the database
 * @param {string} recipientUserID - string represening recipients UUID
 * @param {string} senderUserID - string representing sender's UUID
 * @returns {Promsie<boolean>} - returns promise of true if successful. Else throws error.
 */
const rejectFriendRequest = async (recipientUserID, senderUserID) => {
    try {
        // deletes outstanding request on recipient side of database as request is not present on sender side
        const queryText = `
            DELETE FROM friends
            WHERE user_id = $1 AND friend_id = senderUserId
            ;
        `;
        const values = [recipientUserID, senderUserID];
        await db.query(queryText, values);
        return true;
    } 
    catch (error) {
        console.log(`Failed to reject friend request`);
        throw error;
    }
};

/**
 * Query responsible for updating and adding new friendship to friends table in the database. This query updates recipients side of friends table entry and inserts into sender side
 * @param {string} recipientUserID - string represening recipients UUID
 * @param {string} senderUserID - string representing sender's UUID
 * @returns {Promsie<boolean>} - returns promise of true if successful. Else throws error.
 */
const acceptFriendRequest = async (recipientUserID, senderUserID) => {
    try {
        // adds sender and recipient as friends on both the recipient side and the sender side of the friends table within the database
        // uses transaction group to group multiple sql statements as we need one for the update of the already existing recipient entry status and one for the insertion for the sender
        const queryText = `
            BEGIN;

            -- updating the entry in friends table corresponding to the recipient
            UPDATE friends
            SET status = true
            WHERE user_id = $1 AND friend_id = $2
            ;

            -- inserting new entry into friends table corresponding to the sender
            INSERT INTO friends (user_id, friends_id, status)
            VALUES ($2, $1, true)
            ;

            COMMIT;
        `;
        const values = [recipientUserID, senderUserID];
        await db.query(queryText, values);
        return true;
    } 
    catch (error) {
        console.log(`Failed to accept friend request`);
        throw error;
    }
}

module.exports = {
    getUserFriendData,
    sendFriendRequest,
    rejectFriendRequest,
    acceptFriendRequest,
};