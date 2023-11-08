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

import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, KeyboardAvoidingView, TouchableOpacity, Touchable } from "react-native";
import BackButton from "../components/BackButton";
import ProfilePicture from "../components/ProfilePicture";
import ActivityIndicator from "../components/ActivityIndicator";
import ExpandableTextBox from "../components/ExpandableTextBox";
import ChatMessage from "../components/ChatMessage";
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  const handleTextChange = (text) => {
    setMessageText(text);
  };

  const handleMessageSubmit = () => {
    if (messageText.trim() !== '') {
        const newMessage = { text: messageText, sender: 'user' };
        setMessages([...messages, newMessage]);
        setMessageText('');
    }
  };



  const { rootContainer, header, headerSection, messageSection, sendSection, sendContent } = styles;
  return (
    <SafeAreaView style={rootContainer}>
      <StatusBar></StatusBar>
      <View style={header}>
        <BackButton onPress={() => navigation.goBack()}></BackButton>
        <View style={headerSection}>
          <ProfilePicture initials="CA" color="#DB1CD3" bubbleSize={30}></ProfilePicture>
          <Text>carlosra0345</Text>
        </View>
        <View style={headerSection}>
          <ActivityIndicator isOnline={true}></ActivityIndicator>
          <Text>Online</Text>
        </View>
      </View>

      <ScrollView style={messageSection}>
          {messages.map((message, index) => (
                  <ChatMessage key={index} content={message.text} sentByCurrUser={true} />
          ))}
      </ScrollView>


      <KeyboardAvoidingView style={sendSection} behavior="padding">
        <View style={sendContent}>
            <TouchableOpacity>
              <AntDesign name="plus" size={30} color="#0078D4" />
            </TouchableOpacity>
            <ExpandableTextBox callbackText={handleTextChange} currentValue={messageText}></ExpandableTextBox>
            <TouchableOpacity onPress={handleMessageSubmit}>
              <MaterialCommunityIcons name="send-circle" size={35} color="#0078D4" />
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
  messageSection: {
    flex: 12,
    backgroundColor: "#FFFFFF",
  },
  sendSection: {
    paddingTop: 10,
  },
  sendContent: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  }
});

export default ChatScreen;
