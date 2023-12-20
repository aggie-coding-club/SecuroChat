/* ConversationTab.js
 * This is a custom React component generating the a conversation tab given distinct props
 * Other external custom componentes used:
 * {
 *   ProfilePicture.js
 *   MessagesToRead.js
 * }
 */

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../AuthContext";
import ProfilePicture from "../components/ProfilePicture";
import MessagesToRead from "../components/MessagesToRead";

/**
 * Custom react native component responsible for rendering conversations on user's home screen
 * @param {object} props - Javascript object containing react native props
 * @param {object} props.conversationObject - object containing conversation data
 * @property {string} props.color - hexadecimal representation of color to fill in user profile
 * @property {string} props.bubbleSize - Sets the size of the profile picture bubble
 * @property {string} props.prevMessage - string filling in last message sent in conversation
 * @property {boolean} props.notSeen - boolean being true if user has chats not yet read, false otherwise
 * @property {string} props.lastMessageTime - string showing time of last sent message
 * @property {string} props.lastDate - string representing date of last message sent if user has seen all messages
 * @property {number} props.numMessagesNotRead - number representing number of messages user has not read
 * @property {function} props.onPress - function that is called onPress
 */
const ConversationTab = (props) => {
  useEffect(() => {
    setConversationName(generateName());
  });

  // globalClientUsername with useAuth
  const { globalClientUsername } = useAuth();

  // holding conversation name
  const [conversationName, setConversationName] = useState("");

  // function responsible for generating name of a conversation
  const generateName = () => {
    if (props.conversationObject.conversation_title) {
      return props.conversationObject.conversation_title;
    }

    // using default conversation name instead
    const chatParticipants = props.conversationObject.conversation_participants;
    if (chatParticipants.length > 2) {
      let title = "";
      for (let i = 0; i < chatParticipants.length; ++i) {
        if (i === chatParticipants.length - 1) {
          title += chatParticipants[i].username;
        } else if (i === chatParticipants.length - 2) {
          title += chatParticipants[i].username + " & ";
        } else {
          title += chatParticipants[i].username + ", ";
        }
      }
      return title;
    } else {
      for (let entry of chatParticipants) {
        if (entry.username !== globalClientUsername) {
          return entry.username;
        }
      }
    }
  };

  // function obtaining directMessage default icon color
  const getDirectMessageIconColor = () => {
    for (let entry of props.conversationObject.conversation_participants) {
      if (entry.username !== globalClientUsername) {
        return entry.iconColor;
      }
    }
  };

  // function responsible for determining time/date to display on conversation
  const timeDateDisplay = () => {
    const messageDate = new Date(props.lastMessageTime);
    const currentDate = new Date();
    if (messageDate.toLocaleDateString() !== currentDate.toLocaleDateString()) {
      const tempDate = messageDate.toLocaleDateString();
      const dateArray = tempDate.split("/");

      // extracting last two digits of the year
      const lastTwoYearDigits = dateArray[2].slice(-2);

      return `${dateArray[0]}/${dateArray[1]}/${lastTwoYearDigits}`;
    }
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localTime = messageDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: userTimeZone,
    });
    return localTime;
  };

  const {
    container,
    conversationContent,
    conversationTitle,
    conversationText,
    unreadConversationInfo,
    unreadConversationTime,
    readConversationInfo,
    readConversationTime,
  } = styles;
  return (
    <TouchableOpacity style={container} onPress={props.onPress}>
      <ProfilePicture
        initials={conversationName.substring(0, 2).toUpperCase()}
        color={getDirectMessageIconColor()}
        bubbleSize={props.bubbleSize}
      ></ProfilePicture>
      <View style={conversationContent}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={conversationTitle}>
          {conversationName}
        </Text>
        <Text style={conversationText}>{props.prevMessage}</Text>
      </View>
      {props.notSeen && (
        <View style={unreadConversationInfo}>
          <Text style={unreadConversationTime}>{timeDateDisplay()}</Text>
          <MessagesToRead
            numMessagesNotRead={props.numMessagesNotRead}
            bubbleSize={25}
          />
        </View>
      )}
      {!props.notSeen && (
        <View style={readConversationInfo}>
          <Text style={[readConversationTime, { fontSize: seenFontSize }]}>
            {seenValue}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: "#C0C0C0",
    borderBottomWidth: 0.5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  conversationContent: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
    gap: 10,
  },
  conversationTitle: {
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 18,
  },
  conversationText: {
    color: "#8C8989",
  },
  unreadConversationInfo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  unreadConversationTime: {
    color: "#0078D4",
    fontFamily: "RobotoCondensed_400Regular",
    fontSize: 18,
  },
  readConversationInfo: {
    display: "flex",
    alignSelf: "flex-start",
  },
  readConversationTime: {
    color: "#8C8989",
    fontFamily: "RobotoCondensed_400Regular",
  },
});

export default ConversationTab;
