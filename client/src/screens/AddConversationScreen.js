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

import React, { useState, useEffect } from "react";
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

/**
 * Custom React Native component responsible for rendering the addConversationScreen
 * @param navigation - react navigation object used for stack navigation
 */
const AddConversationScreen = ({ navigation }) => {
  // creating state handler for selected chat participants
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  // function handling action when a user is SelectedUser component is pressed
  const handleAlteredDataFromChild = (data) => {
    const newSelectedParticipants = [...selectedParticipants];
    if (data.isSelected) {
        newSelectedParticipants.push(data.entryUsername);
    }
    else {
        const indexToRemove = newSelectedParticipants.indexOf(data.entryUsername);
        newSelectedParticipants.splice(indexToRemove, 1);
    }
    setSelectedParticipants(newSelectedParticipants);
  };

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
          style={selectedUserContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {
            selectedParticipants.map((item, index) => (
                <SelectedUser 
                    key={index}
                    username={item}
                />
            ))}
        </ScrollView>
      </View>

      <ScrollView>
          <AddConversationFriendEntry
            initials={"CA"}
            color={"#DB3E1C"}
            bubbleSize={45}
            username={"carlosra0345"}
            isSelected={true}
            sendToParent={handleAlteredDataFromChild}
          />
          <AddConversationFriendEntry
            initials={"JI"}
            color={"#DBBC1C"}
            bubbleSize={45}
            username={"jimenacortes"}
            isSelected={true}
            sendToParent={handleAlteredDataFromChild}
          />
          <AddConversationFriendEntry
            initials={"SI"}
            color={"#D71CDB"}
            bubbleSize={45}
            username={"sid021"}
            isSelected={false}
            sendToParent={handleAlteredDataFromChild}
          />
          <AddConversationFriendEntry
            initials={"OL"}
            color={"#1C7FDB"}
            bubbleSize={45}
            username={"oliverstalker"}
            isSelected={true}
            sendToParent={handleAlteredDataFromChild}
          />
      </ScrollView>

      <View style={buttonContainer}>
        <GeneralButton content={"Create New Chat"} />
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
