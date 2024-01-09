/* AddFriendScreen.js
 * This is a custom React component responsible for adding friends
 * Other external custom componentes used:
 * {
 *   GeneralButton.js
 *   GeneralInput.js
 *   BackButton.js
 * }
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import GeneralButton from "../components/GeneralButton";
import GeneralInput from "../components/GeneralInput";
import BackButton from "../components/BackButton";
import api from "../api";
import { useAuth } from "../AuthContext";

const AddFriendScreen = ({ navigation }) => {
  // retrieving userTokenwith useAuth
  const { token } = useAuth();

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  // function responsible for sending friend request to specified user
  const sendFriendRequest = async (recipientUsername) => {
    try {
      const apiURL = "user/sendFriendRequest";
      await api.post(
        apiURL,
        {
          recipientUsername: recipientUsername,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return true;
    } catch (error) {
      console.error("Error while sending friend request: ", error);
      return false;
    }
  };

  const {
    rootContainer,
    backButton,
    pageHeader,
    welcomeText,
    mainTitle,
    topContainer,
    inputContainer,
    inputText,
    buttonContainer,
  } = styles;
  return (
    <SafeAreaView style={rootContainer}>
      <StatusBar></StatusBar>
      <View style={topContainer}>
        <BackButton
          style={backButton}
          onPress={() => navigation.goBack()}
        ></BackButton>
        <TouchableOpacity>
          <Entypo name="share-alternative" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <View style={pageHeader}>
        <Text style={welcomeText}>Add friends on</Text>
        <Text style={mainTitle}>SecuroChat</Text>
      </View>

      <View style={inputContainer}>
        <Text style={inputText}>Add friends through username</Text>
        <GeneralInput
          content={"Enter username"}
          color={"#1E1E1E"}
          onInputChange={handleInputChange}
        />
      </View>

      <View style={buttonContainer}>
        <GeneralButton
          content={"Send Friend Request"}
          onPress={() => sendFriendRequest(inputValue)}
        />
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
  },
  pageHeader: {
    marginTop: 30,
    alignItems: "center",
  },
  welcomeText: {
    color: "#1E1E1E",
    fontSize: 30,
    fontFamily: "RobotoCondensed_700Bold",
  },
  mainTitle: {
    color: "#0078D4",
    fontSize: 40,
    fontFamily: "RobotoCondensed_700Bold",
  },
  topContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 25,
    marginRight: 25,
  },
  inputContainer: {
    marginTop: 35,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  inputText: {
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 18,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 15,
  },
});

export default AddFriendScreen;
