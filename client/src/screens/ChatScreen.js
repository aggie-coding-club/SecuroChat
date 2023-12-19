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

import React, { useState, useRef } from "react";
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
import ProfilePicture from "../components/ProfilePicture";
import ActivityIndicator from "../components/ActivityIndicator";
import ExpandableTextBox from "../components/ExpandableTextBox";
import ChatMessage from "../components/ChatMessage";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../AuthContext";
import { useRoute } from '@react-navigation/native';

/**
 * React component rendering chat screen for a specific conversation
 * @param {navigation} navigation - object containing navigation from react navigation
 */
const ChatScreen = ({ navigation }) => {
  // retrieving userToken and globalClientUsername with useAuth
  const { token, globalClientUsername, defaultProfileColor } = useAuth();

  // receiving paramaters from previous screen
  const route = useRoute();
  const isDirectMessage = true;

  //   chatParicipantElement: {
  //     userID: props.userID,
  //     username: props.username,
  //     iconColor: props.color,
  //     userInitials: props.initials,
  // },
  const [chatParticipants, setChatParticipants] = useState(!route.params.isChatCreated ? route.params.potentialChatParticipants : []);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  const handleTextChange = (text) => {
    setMessageText(text);
  };

  const handleMessageSubmit = () => {
    if (messageText.trim() !== "") {
      const newMessage = { text: messageText, sender: "user" };
      setMessages([...messages, newMessage]);
      setMessageText("");
    }
  };

  // initializing useRef for scrollView for messages
  const messageScrollViewRef = useRef();

  // function responsible for scrolling to the bottom when new messages are populated
  const scrollToBottom = () => {
    messageScrollViewRef.current.scrollToEnd({ animated: true });
  };

  // function responsible for generating header content
  const generateInitialHeaderContent = () => {
    let title = "";
    for (let i = 0; i < chatParticipants.length; ++i) {
      if (i === chatParticipants.length - 1) {
        title += chatParticipants[i].username;
      }
      else if (i === chatParticipants.length - 2) {
        title += chatParticipants[i].username + " & ";
      }
      else {
        title += chatParticipants[i].username + ", ";
      }
    }

    return (
      <View style={header}>
        <BackButton
          onPress={() => navigation.navigate("HomeScreen")}
        ></BackButton>
        <View style={titleContainer}>
          <Text style={headerTitle} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
        </View>
        <View style={headerSection}>
          <ActivityIndicator isOnline={true}></ActivityIndicator>
          <Text>Online</Text>
        </View>
      </View>
    )
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
      {generateInitialHeaderContent()}
      
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
              content={message.text}
              sentByCurrUser={true}
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
