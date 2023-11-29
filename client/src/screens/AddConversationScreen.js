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

  // state handler for user's friend's usernames
  const [friendUsernames, setFriendUsernames] = useState([]);

  // initializing useRef for scrollView for added participants
  const participantScrollViewRef = useRef();

  // function responsible for handling buttonPress
  const onButtonPress = () => {
    if (selectedParticipants.length) {
      navigation.navigate("ChatScreen");
    }
  };

  // function handling action when a user is SelectedUser component is pressed
  const handleAlteredDataFromChild = (data) => {
    const newSelectedParticipants = [...selectedParticipants];
    if (data.isSelected) {
      newSelectedParticipants.push(data.entryUsername);
    } else {
      const indexToRemove = newSelectedParticipants.indexOf(data.entryUsername);
      newSelectedParticipants.splice(indexToRemove, 1);
    }
    setSelectedParticipants(newSelectedParticipants);
  };

  // function responsible for scrolling to end each time new SelectedUser component is added
  const scrollToRight = () => {
    participantScrollViewRef.current.scrollToEnd({ animated: true });
  };

  // function responsible for fetching all of user's friend's usernames
  const fetchAllFriendUsernames = async () => {
    try {
      const apiURL = "/user/fetchAllFriendUsernames";
      const response = await api.get(apiURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFriendUsernames(response.data.allCurrentFriends);
      return true;
    } catch (error) {
      console.error(
        "Error while rendering friend data on friends screen: ",
        error
      );
      return false;
    }
  };

  // function responsible for choosing random color
  const randomColor = () => {
    const colorOptions = [
      `#0078D4`,
      `#DB1CD3`,
      `#1CDB24`,
      `#DB1C3F`,
      `#DBD31C`,
    ];

    // generating random index
    const randomIndex = Math.floor(Math.random() * colorOptions.length);

    return colorOptions[randomIndex];
  };

  // useEffect used to initially query server and obtain friends usernames upon mount of component
  useEffect(() => {
    fetchAllFriendUsernames();
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
        <Text style={participantSectionText}>To</Text>
        <ScrollView
          ref={participantScrollViewRef}
          style={selectedUserContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={scrollToRight}
        >
          {selectedParticipants.map((item, index) => (
            <SelectedUser key={index} username={item} />
          ))}
        </ScrollView>
      </View>

      <ScrollView>
        {friendUsernames.map((item, index) => (
          <AddConversationFriendEntry
            key={index}
            initials={item.substring(0, 2).toUpperCase()}
            color={randomColor()}
            bubbleSize={45}
            username={item}
            sendToParent={handleAlteredDataFromChild}
          />
        ))}
      </ScrollView>

      <View style={buttonContainer}>
        <GeneralButton content={"Create New Chat"} onPress={onButtonPress} />
      </View>
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
    marginTop: 20,
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
