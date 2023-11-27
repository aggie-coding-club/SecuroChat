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
import { useEffect, useRef } from "react";
import api from "../api";

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    ws.current = new WebSocket('ws://your-websocket-server-url'); // Replace with your WebSocket server URL
    ws.current.onopen = () => {
      console.log('WebSocket Connected');
    };
    ws.current.onmessage = (e) => {
      const message = JSON.parse(e.data);
      if (message.type === 'newMessage') {
        setMessages((prevMessages) => [...prevMessages, message.payload]);
      }
    };
    ws.current.onerror = (e) => {
      console.error(e.message);
    };
    ws.current.onclose = (e) => {
      console.log('WebSocket Disconnected', e.reason);
    };

    const fetchChatHIstory = async () => {
      try {
        const res = await api.get('/messages/conversation/:conversationId');
        setMessages(res.data);
      }
      catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };
  
    fetchChatHIstory();

    // Clean up WebSocket connection
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleTextChange = (text) => {
    setMessageText(text);
  };

  ws.current.onmessage = (e) => {
    const event = JSON.parse(e.data);
    switch (event.type) {
      case 'newMessage':
        // handle new message
        break;
      case 'userTyping':
        // handle user typing
        break;
      // ... other event types
      case 'messageRead':
        // handle message read
        break;
      default:
        break;
    }
  };

  const handleMessageSubmit = () => {
    if (messageText.trim() !== '') {
      // Construct a message object 
      const newMessage = { text: messageText, sender: 'user' };
      
      // Send the message object to the server
      ws.current.send(JSON.stringify({
        type: 'sendMessage',
        payload: newMessage
      }));

      // Add the message to local state to display it in the UI
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const handleMessageRead = (messageId) => {
    // emit receipt event to server
    ws.current.send(JSON.stringify({
      type: 'messageRead',
      payload: { messageId: messageId, userId: 'user' } // replace with actual userId
    }));
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
