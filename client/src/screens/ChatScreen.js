/* ChatScreen.js
 * This is a custom React component generating the ChatScreen
 * Other external custom componentes used:
 *  {
 *    BackButton.js
 *    ProfilePicture.js
 *    ActivityIndicator.js
 *    MessageInput.js
 *    ChatMessage.js
 *  }
 */

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import BackButton from "../components/BackButton";
import ActivityIndicator from "../components/ActivityIndicator";
import ExpandableTextBox from "../components/ExpandableTextBox";
import ChatMessage from "../components/ChatMessage";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../AuthContext";
import { useRoute } from "@react-navigation/native";
import api from "../api";

/**
 * React component rendering chat screen for a specific conversation
 * @param {navigation} navigation - object containing navigation from react navigation
 */
const ChatScreen = ({ navigation }) => {
  // retrieving userToken and globalClientUsername with useAuth
  const { token, globalClientUsername, globalClientID } = useAuth();

  // receiving paramaters from previous screen
  const route = useRoute();
  const { isChatCreated, potentialChatParticipants, conversationObject } =
    route.params;

  //   chatParicipantElement: {
  //     userID: props.userID,
  //     username: props.username,
  //     iconColor: props.color,
  //     userInitials: props.initials,
  // },
  const [chatParticipants, setChatParticipants] = useState(
    isChatCreated
      ? conversationObject.conversation_participants
      : potentialChatParticipants
  );
  const [messages, setMessages] = useState(
    isChatCreated ? conversationObject.messagesData : []
  );
  const [messageText, setMessageText] = useState(""); // message text is the current message actively being types within the textbox
  const [chatTitle, setChatTitle] = useState("");

  // use effect running upon initial component mount
  useEffect(() => {
    // function determining whether this chat already exists and loading in appropriate data if so


    // function call to determine title of conversation
    generateInitialHeaderContent();
  }, []);

  const handleTextChange = (text) => {
    setMessageText(text);
  };

  // function responsible for determining whether chat with these selected participants exists
  const isNewChat = async () => {
    try {
      console.log("testing");
    }
    catch {
      console.error("Error while fetching messages of conversation: ", error);
      return false;
    }
  };

  // function responsible for generating header title for chat
  const generateInitialHeaderContent = () => {
    if (conversationObject && conversationObject.conversation_title) {
      setChatTitle(conversationObject.conversation_title);
      return conversationObject.conversation_title;
    }

    // using default conversation name instead and removing client's username from participant array
    let filteredChatParticipants = chatParticipants.filter(
      (obj) => obj.username !== globalClientUsername
    );

    // action if conversation is a group chat
    if (filteredChatParticipants.length > 1) {
      let title = "";
      for (let i = 0; i < filteredChatParticipants.length; ++i) {
        if (i === filteredChatParticipants.length - 1) {
          title += filteredChatParticipants[i].username;
        } else if (i === filteredChatParticipants.length - 2) {
          title += filteredChatParticipants[i].username + " & ";
        } else {
          title += filteredChatParticipants[i].username + ", ";
        }
      }
      setChatTitle(title);
      return title;
    }

    // action when conversation is a direct message
    setChatTitle(filteredChatParticipants[0].username);
    return filteredChatParticipants[0].username;
  };

  // function responsible for fetching message data from conversation
  const fetchConversationMessages = async () => {
    try {
      const apiURL = "messages/fetchMessagesByConversation";
      const response = await api.get(apiURL, {
        params: { conversationID: conversationObject.conversation_id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error("Error while fetching messages of conversation: ", error);
      return false;
    }
  };

  // function responsible for creating new conversation in database
  const createNewConversation = async (newMessageText) => {
    try {
      const apiURL = "conversations/createNewConversation";
      await api.post(
        apiURL,
        {
          conversationTitle: chatTitle,
          allParticipantData: chatParticipants,
          messageText: newMessageText.messageContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return true;
    } catch (error) {
      console.error(
        "Error while creating new conversation in database: ",
        error
      );
      return false;
    }
  };

  const handleMessageSubmit = () => {
    if (messageText.trim() !== "") {
      const newMessage = {
        messageContent: messageText,
        senderID: globalClientID,
        timeMessageSent: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessageText("");

      // action depending on if conversation is already existing or not
      if (isChatCreated) {
        console.log("Whats UPPPPPP");
      } else {
        createNewConversation(newMessage);
      }
    }
  };

  // initializing useRef for scrollView for messages
  const messageScrollViewRef = useRef();

  // function responsible for scrolling to the bottom when new messages are populated
  const scrollToBottom = () => {
    messageScrollViewRef.current.scrollToEnd({ animated: true });
  };

  const {
    rootContainer,
    header,
    titleContainer,
    headerTitle,
    headerSection,
    messageSection,
    sendSection,
    sendContent,
    emptyFriends,
    emptyText,
  } = styles;

  return (
    <SafeAreaView style={rootContainer}>
      <StatusBar></StatusBar>
      <View style={header}>
        <BackButton
          onPress={() => navigation.navigate("HomeScreen")}
        ></BackButton>
        <View style={titleContainer}>
          <Text style={headerTitle} numberOfLines={1} ellipsizeMode="tail">
            {chatTitle}
          </Text>
        </View>
        <View style={headerSection}>
          <ActivityIndicator isOnline={true}></ActivityIndicator>
          <Text>Online</Text>
        </View>
      </View>

      {messages.length === 0 && (
        <View style={emptyFriends}>
          <Text style={emptyText}>No messages yet,</Text>
          <Text style={emptyText}>Start chatting!</Text>
        </View>
      )}

      {messages.length > 0 && (
        <ScrollView
          ref={messageScrollViewRef}
          style={messageSection}
          onContentSizeChange={scrollToBottom}
        >
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              content={message.messageContent}
              sentByCurrUser={
                message.senderID === globalClientID ? true : false
              }
            />
          ))}
        </ScrollView>
      )}

      <KeyboardAvoidingView style={sendSection} behavior="padding">
        <View style={sendContent}>
          <TouchableOpacity>
            <AntDesign name="plus" size={30} color="#0078D4" />
          </TouchableOpacity>
          <ExpandableTextBox
            callbackText={handleTextChange}
            currentValue={messageText}
          ></ExpandableTextBox>
          <TouchableOpacity onPress={handleMessageSubmit}>
            <MaterialCommunityIcons
              name="send-circle"
              size={35}
              color="#0078D4"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  headerSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  titleContainer: {
    overflow: "hidden",
    maxWidth: 250,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "RobotoCondensed_700Bold",
  },
  messageSection: {
    flex: 12,
    backgroundColor: "#FFFFFF",
    paddingTop: 15,
    paddingBottom: 15,
  },
  sendSection: {
    paddingTop: 10,
    marginTop: 15,
  },
  sendContent: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  emptyFriends: {
    flex: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  emptyText: {
    color: "#A2A2A2",
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 20,
  },
});

export default ChatScreen;
