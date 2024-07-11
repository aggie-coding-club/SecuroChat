/* AddConversationScreen.js
 * This is a custom React component generating the addConversationScreen
 * Imports API as screen is dynamically populated depending on users current friends
 * Other external custom componentes used:
 * {
 *   AddConversationFriendEntry
 *   BackButton.js
 *   GeneralButton.js
 *   SelectedUser.js
 * }
 */

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import BackButton from "../components/BackButton";
import AddConversationFriendEntry from "../components/AddConversationFriendEntry";
import GeneralButton from "../components/GeneralButton";
import SelectedUser from "../components/SelectedUser";
import api from "../api";
import { useAuth } from "../AuthContext";

/**
 * Custom React Native component responsible for rendering the addConversationScreen
 * @param navigation - react navigation object used for stack navigation
 */
const AddConversationScreen = ({ navigation }) => {
  // retrieving userToken with useAuth
  const { token } = useAuth();

  // creating state handler for selected chat participants
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  // state handler for user's friend's data
  const [currentFriendData, setCurrentFriendData] = useState([]);

  // initializing useRef for scrollView for added participants
  const participantScrollViewRef = useRef();

  // function responsible for navigation to the created default chat screen upon button press
  const toChatScreen = (conversationObject) => {
    let parameters = conversationObject
      ? { isChatCreated: true, conversationObject }
      : {
          isChatCreated: false,
          potentialChatParticipants: selectedParticipants,
        };
    navigation.navigate("ChatScreen", parameters);
  };

  // function responsible for handling buttonPress
  const onButtonPress = async () => {
    const conversationObject = await isNewChat();
    toChatScreen(conversationObject);
  };

  // function handling action when a user is SelectedUser component is pressed
  const handleAlteredDataFromChild = (data) => {
    const newSelectedParticipants = [...selectedParticipants];
    if (data.isSelected) {
      newSelectedParticipants.push(data.userData);
    } else {
      const indexToRemove = newSelectedParticipants.findIndex(
        (item) => item.username === data.userData.username
      );
      newSelectedParticipants.splice(indexToRemove, 1);
    }
    setSelectedParticipants(newSelectedParticipants);
  };

  // function responsible for scrolling to end each time new SelectedUser component is added
  const scrollToRight = () => {
    participantScrollViewRef.current.scrollToEnd({ animated: true });
  };

  // function responsible for determining whether chat with these selected participants exists
  const isNewChat = async () => {
    try {
      const apiURL = "/conversations/conversationExists";
      const response = await api.get(apiURL, {
        params: { selectedParticipants },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error while determining if isNewChat: ", error);
      return false;
    }
  };

  // function responsible for fetching all of user's friend's usernames
  const fetchAllCurrentFriendData = async () => {
    try {
      const apiURL = "/user/fetchAllCurrentFriendData";
      const response = await api.get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentFriendData(response.data.allCurrentFriends);
      return true;
    } catch (error) {
      console.error(
        "Error while rendering friend data on friends screen: ",
        error
      );
      return false;
    }
  };

  // useEffect used to initially query server and obtain friends usernames upon mount of component
  useEffect(() => {
    fetchAllCurrentFriendData();
  }, []);

  const {
    rootContainer,
    backButton,
    header,
    headerTitle,
    participantSection,
    participantSectionText,
    selectedUserContainer,
    buttonContainer,
  } = styles;

  return (
    <SafeAreaView style={rootContainer}>
      <StatusBar></StatusBar>
      <View style={header}>
        <BackButton
          style={backButton}
          onPress={() => navigation.goBack()}
        ></BackButton>
        <Text style={headerTitle}>Select Participants</Text>
      </View>
      <View style={participantSection}>
        {selectedParticipants.length > 0 && (
          <Text style={participantSectionText}>To</Text>
        )}
        <ScrollView
          ref={participantScrollViewRef}
          style={selectedUserContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={scrollToRight}
        >
          {selectedParticipants.map((item, index) => (
            <SelectedUser key={index} username={item.username} />
          ))}
        </ScrollView>
      </View>

      <ScrollView>
        {currentFriendData.map((item, index) => (
          <AddConversationFriendEntry
            key={index}
            initials={item.friendUsername.substring(0, 2).toUpperCase()}
            color={item.friendIconColor}
            bubbleSize={45}
            username={item.friendUsername}
            userID={item.friendID}
            sendToParent={handleAlteredDataFromChild}
          />
        ))}
      </ScrollView>

      {selectedParticipants.length > 0 && (
        <View style={buttonContainer}>
          <GeneralButton content={"Create New Chat"} onPress={onButtonPress} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  headerTitle: {
    fontFamily: "RobotoCondensed_400Regular",
    fontSize: 25,
    marginLeft: 35,
  },
  header: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  participantSectionText: {
    color: "#A2A2A2",
    fontFamily: "RobotoCondensed_400Regular",
    fontSize: 22,
    marginLeft: 15,
  },
  participantSection: {
    gap: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  selectedUserContainer: {
    marginLeft: 5,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 10,
  },
});

export default AddConversationScreen;
