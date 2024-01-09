/* chatSocket.js
 * Responsible for handling websocket communications for real-time messaging
 * Emits messages to respective recipients based on events
 * Responsible for updating online status and handling connections/disconnections
 */
const db = require("../../database.js");
const ConversationModel = require("../models/conversationModel.js");
const MessageModel = require("../models/messageModel.js");

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle user connection
    socket.on("userConnected", async (userId) => {
      try {
        // Update user status to online in database
        await db.query(
          "UPDATE users SET online_status = TRUE WHERE user_id = $1",
          [userId]
        );
        // Notify other users
        socket.broadcast.emit("userStatusChanged", {
          userId,
          onlineStatus: true,
        });
        socket.userId = userId; // Storing userId in socket for future reference
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    });

    // Handle user disconnection
    socket.on("disconnect", async () => {
      try {
        if (socket.userId) {
          await db.query(
            "UPDATE users SET online_status = FALSE WHERE user_id = $1",
            [socket.userId]
          );
          socket.broadcast.emit("userStatusChanged", {
            userId: socket.userId,
            onlineStatus: false,
          });
        }
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    });

    // Handle creating a new conversation
    socket.on("createConversation", async (conversationData) => {
      try {
        const newConversation = await ConversationModel.createConversation(
          conversationData
        );
        conversationData.users.forEach((userId) => {
          socket.to(userId).emit("newConversation", newConversation);
        });
      } catch (error) {
        console.error("Error creating new conversation:", error);
      }
    });

    // Handle adding a user to a conversation
    socket.on("addUserToConversation", async (data) => {
      try {
        await ConversationModel.addUserToConversation(
          data.userId,
          data.conversationId
        );
        io.to(data.conversationId).emit("userAddedToConversation", data);
      } catch (error) {
        console.error("Error adding user to conversation:", error);
      }
    });

    // Handle sending and receiving messages
    socket.on("sendMessage", async (message) => {
      try {
        const savedMessage = await MessageModel.createMessage(
          message.userId,
          message.conversationId,
          message.text
        );
        io.to(message.conversationId).emit("newMessage", savedMessage);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    // Handle typing indicator
    socket.on("typing", (data) => {
      socket
        .to(data.conversationId)
        .emit("userTyping", {
          userId: data.userId,
          conversationId: data.conversationId,
        });
    });

    // Handle read receipts
    socket.on("messageRead", async (data) => {
      try {
        await MessageModel.markMessageAsRead(data.userId, data.messageId);
        socket.to(data.conversationId).emit("messageRead", data);
      } catch (error) {
        console.error("Error updating read receipt:", error);
      }
    });

    // Additional event listeners as needed
  });
};
