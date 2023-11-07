/* ChatScreen.js
 * This is a custom React component generating the ChatScreen
 * Other external custom componentes used:
 *  {
 *    BackButton.js
 *    ProfilePicture.js
 *    ActivityIndicator.js
 *    MessageInput.js
 *  }
 */

import React from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList, KeyboardAvoidingView } from "react-native";
import BackButton from "../components/BackButton";
import ProfilePicture from "../components/ProfilePicture";
import ActivityIndicator from "../components/ActivityIndicator";
import ExpandableTextBox from "../components/ExpandableTextBox";
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ChatScreen = ({ navigation }) => {
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

      <View style={messageSection}>
        <Text>HI</Text>
      </View>

      <KeyboardAvoidingView style={sendSection} behavior="padding">
        <View style={sendContent}>
            <AntDesign name="plus" size={30} color="#0078D4" />
            <ExpandableTextBox></ExpandableTextBox>
            <MaterialCommunityIcons name="send-circle" size={35} color="#0078D4" />
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
    justifyContent: "center",
    alignItems: "center",
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
