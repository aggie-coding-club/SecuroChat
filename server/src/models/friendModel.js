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
            SELECT users.user_id AS friend_user_id, users.username AS friend_username, users.last_online, users.icon_color, friends.status
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

        const currentLocalTime = new Date(); 
        const currentUTCTime = new Date(currentLocalTime.getTime() + currentLocalTime.getTimezoneOffset() * 60000);
        
        // iterating through rows of result populating arrays
        for (const row of result.rows) {
            const friendObject = {
                friendID: row.friend_user_id,
                friendUsername: row.friend_username,
                friendLastOnline: row.last_online,
                friendIconColor: row.icon_color,
            };
            
            if (row.status) {
                if (row.last_online) {
                    const lastOnlineTime = new Date(row.last_online);
                    const timeDifference = Math.abs(currentUTCTime - lastOnlineTime) / 60000;
    
                    // assuming thresholds of 5 minutes for online status
                    const minuteDeadline = 5;
                    if (timeDifference <= minuteDeadline) {
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

        // sorting arrays in increasing order
        friendRequests.sort((a, b) => a.friendUsername.localeCompare(b.friendUsername));
        onlineFriends.sort((a, b) => a.friendUsername.localeCompare(b.friendUsername));
        offlineFriends.sort((a, b) => a.friendUsername.localeCompare(b.friendUsername));

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
 * Query responsible for fetching all of the specified users current friend's usernames
 * @param {string} userID - string depicting users ID
 * @returns {Promise<Array>} - returns promise of an array 
 */
const getAllCurrentUserFriends = async (userID) => {
    try {
        const queryText = `
            SELECT users.user_id AS friend_user_id ,users.username AS friend_username, icon_color
            FROM friends
            JOIN users ON friends.friend_id = users.user_id
            WHERE friends.user_id = $1 AND friends.status = true
            ;
        `;
        const values = [userID];
        const result = await db.query(queryText, values);

        const allCurrentFriends = [];
        for (let row of result.rows) {
            const friendObject = {
                friendID: row.friend_user_id,
                friendUsername: row.friend_username,
                friendIconColor: row.icon_color,
            };
            allCurrentFriends.push(friendObject);
        }

        // sorting the array alphabetically in increasing order
        allCurrentFriends.sort((a, b) => a.friendUsername.localeCompare(b.friendUsername));

        // returning array of user's friends' usernames
        return {allCurrentFriends: allCurrentFriends};
    } 
    catch (error) {
        console.log(`Failed to retrieve all of user's current friends`);
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
            WHERE user_id = $1 AND friend_id = $2
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

        // beginning the query transaction
        await db.query(`BEGIN`);

        // writing query messages and values
        const updateQueryText = `
            UPDATE friends
            SET status = true
            WHERE user_id = $1 AND friend_id = $2
            ;
        `;
        const postQueryText = `
            INSERT INTO friends (user_id, friend_id, status)
            VALUES ($2, $1, true)
            ;
        `;
        const values = [recipientUserID, senderUserID];

        // updating existing entry in the friends table belongign to the recipient
        await db.query(updateQueryText, values);

        // inserting a new entry in the friends table belonging to the sender
        await db.query(postQueryText, values);

        // committing the transaction
        await db.query(`COMMIT`);
        return true;
    } 
    catch (error) {
        // rolling query back if an error occurs
        await db.query(`ROLLBACK`);
        console.log(`Failed to accept friend request`);
        throw error;
    }
};

module.exports = {
    getUserFriendData,
    getAllCurrentUserFriends,
    sendFriendRequest,
    rejectFriendRequest,
    acceptFriendRequest,
};