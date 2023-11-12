/* chatSocket.js
 * Responsible for handling websocket communications for real-time messaging
 * Emits messages to respective recipients based on events
 * Responsible for updating online status and handling connections/disconnections
*/
const db = require('../../database');

module.exports = function (socket, io) {
    // Handle user connection
    socket.on('userConnected', async (userId) => {
        try {
            // Update user status to online in database
            await db.query('UPDATE users SET online_status = TRUE WHERE user_id = $1', [userId]);
            // Notify other users
            socket.broadcast.emit('userStatusChanged', { userId, onlineStatus: true });
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    });

    // Handle user disconnection
    socket.on('disconnect', async () => {
        try {
            // Extract user ID from socket or session (depends on your implementation)
            let userId = socket.userId; // Example, adjust as per your logic
            // Update user status to offline in database
            await db.query('UPDATE users SET online_status = FALSE WHERE user_id = $1', [userId]);
            // Notify other users
            socket.broadcast.emit('userStatusChanged', { userId, onlineStatus: false });
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    });

    // Handle sending and receiving messages
    socket.on('sendMessage', async (message) => {
        try {
            // Save the message to the database
            const res = await db.query(
                'INSERT INTO messages(user_id, conversation_id, messages_text) VALUES($1, $2, $3) RETURNING *',
                [message.userId, message.conversationId, message.text]
            );
            let savedMessage = res.rows[0];
            // Broadcast the message to other users in the conversation
            io.to(message.conversationId).emit('newMessage', savedMessage);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    // Handle typing indicator
    socket.on('typing', (data) => {
        socket.to(data.conversationId).emit('userTyping', { userId: data.userId, conversationId: data.conversationId });
    });

    // Handle read receipts
    socket.on('messageRead', async (data) => {
        try {
            // Update read status in the database
            await db.query(
                'INSERT INTO read_receipts(user_id, message_id, time_read) VALUES($1, $2, NOW()) ON CONFLICT DO NOTHING',
                [data.userId, data.messageId]
            );
            // Broadcast read receipt to the sender
            socket.to(data.conversationId).emit('messageRead', data);
        } catch (error) {
            console.error('Error updating read receipt:', error);
        }
    });

    // Additional event listeners as needed...
};
