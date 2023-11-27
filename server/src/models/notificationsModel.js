/* notificationsModel.js
 * Defines database schema/model for notifications table
*/

const db = require('../../database');
/**
 * Creates notifications table
 * @returns true if successful
 */
const createNotificationsModel = async () => {
    try{
        const queryText = `
            CREATE TABLE notifications(
                notification_id SERIAL PRIMARY KEY,
                user_id UUID NOT NULL REFERENCES users(user_id),
                message_id INT NOT NULL REFERENCES messages(message_id),
                notification_type VARCHAR(32) NOT NULL,
                notification_text VARCHAR (255) NOT NULL,
                notification_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await db.query(queryText);
        return true;
    }
    catch(error){
        console.log('Failed to create Notifications Model');
        throw error;
    }
};
/**
 * creates a notification entry
 * @param {*} notificationID represents notification ID 
 * @param {*} userID represents user ID
 * @param {*} messageID represents message ID
 * @param {*} notificationType represent notification type
 * @param {*} notificationText represent notification text
 * @param {*} notificationTime represents notification time
 * @returns true if successful
 */
const createNotificationsEntry = async (notificationID, userID, messageID, notificationType, notificationText, notificationTime) => {
    try{
        const queryText = `
            INSERT INTO notifications (notification_id, user_id, message_id, notification_type, notification_text, notification_time)
            VALUES ($1, $2, $3, $4, $5, $6);
        `;
        const values = [notificationID, userID, messageID, notificationType, notificationText, notificationTime];
        await db.query(queryText, values);
        return true;
    }
    catch(error){
        console.log('Failed to create Notifications entry');
        throw error;
    }
};
/**
 * finds notification text given notificationID
 * @param {*} notificationID represents notificationID
 * @returns notification text
 */
const getNotificationText = async (notificationID) => {
    try{
        const queryText = `
            SELECT notification_text FROM notifications
            WHERE notification_id = $1;
        `;
        const values = [notificationID];
        const result = await db.query(queryText, values);
        return result.rows[0].notification_text.toString();
    }
    catch(error){
        console.log('Failed to find notification Text');
        throw error;
    }
};
/**
 * finds notification ID given userID, messageID, notificationTYPE, notificationText, NotificationTime
 * @param {*} userID 
 * @param {*} messageID 
 * @param {*} notificationType 
 * @param {*} notificationText 
 * @param {*} notificationTime 
 * @returns notification ID
 */
const getNotificationID = async (userID, messageID, notificationType, notificationText, notificationTime) => {
    try{
        const queryText = `
            SELECT notification_id FROM notifications
            WHERE user_id = $1 
            AND message_id = $2
            AND notification_type = $3
            AND notification_text = $4
            AND notification_time = $5;
        `;
        const values = [userID, messageID, notificationType, notificationText, notificationTime];
        const result = await db.query(queryText, values);
        return result.rows[0].notification_id.toString();
    }
    catch(error){
        console.log('Failed to find notification ID');
        throw error;
    }
};
/**
 * returns notification time given notification ID
 * @param {*} notificationID 
 * @returns notification time
 */
const getNotificationTime = async (notificationID) => {
    try{
        const queryText = `
            SELECT notification_time FROM notifications
            WHERE notification_id = $1;
        `;
        const values = [notificationID];
        const result = await db.query(queryText, values);
        return result.rows[0].notification_time.toString();
    }
    catch(error){
        console.log('Failed to find notification Time');
        throw error;
    }
};
/**
 * finds notification type given notification ID
 * @param {*} notificationID 
 * @returns notification type
 */
const getNotificationType = async (notificationID) => {
    try{
        const queryText = `
            SELECT notification_type FROM notifications
            WHERE notification_id = $1;
        `;
        const values = [notificationID];
        const result = await db.query(queryText, values);
        return result.rows[0].notification_type.toString();
    }
    catch(error){
        console.log('Failed to find notification type');
        throw error;
    }
};

const getMessageID = async (notificationID) => {
    try{
        const queryText = `
            SELECT message_id FROM notifications
            WHERE notification_id = $1;
        `;
        const values = [notificationID];
        const result = await db.query(queryText, values);
        return result.rows[0].message_id.toString();
    }
    catch(error){
        console.log('Failed to find message ID');
        throw error;
    }
};
/**
 * deletes notification entry given the notification id
 * @param {*} notificationID 
 * @returns true if successful
 */
const deleteNotificationEntry = async (notificationID) => {
    try{
        const queryText = `
            DELETE FROM notifications
            WHERE notification_id = $1;
        `;
        const values = [notificationID];
        await db.query(queryText, values);
        return true;
    }
    catch(error){
        console.log('Failed to delete notification entry');
        throw error;
    }
};
/**
 * gets recent notification that the given user got
 * @param {*} userID represents user ID
 * @returns the most recent notification text that the user got
 */
const getRecentNotifications = async (userID) => {
    try{
        const queryText = `
            SELECT * FROM notifications
            WHERE user_id = $1
            ORDER BY notification_id DESC LIMIT 1;
        `;
        const values = [userID];
        const result = await db.query(queryText, values);
        return result.rows[0].notification_text.toString();
    }
    catch(error){
        console.log('Failed to get most recent notification');
        return false;
    }
}
/**
 * clears all notifications that the userID has
 * @param {*} userID represents user ID
 * @returns true if successful
 */
const clearAllNotifications = async (userID) => {
    try{
        const queryText = `
            DELETE FROM notifications 
            WHERE user_id = $1;
        `;
        const values = [userID];
        await db.query(queryText, values);
        return true;
    }
    catch(error){
        console.log('Failed to clear all notifications');
        return false;
    }
}


module.exports = {
    createNotificationsModel,
    createNotificationsEntry,
    getNotificationText,
    getNotificationID,
    getNotificationTime,
    getNotificationType,
    deleteNotificationEntry,
    getMessageID,
    getRecentNotifications,
    clearAllNotifications,
}