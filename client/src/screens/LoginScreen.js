/* LoginScreen.js
 * This is a custom React component generating the Login Screen
 * Other external custom componentes used:
 *  {
 *   GeneralInput.js,
 *   GeneralButton.js,
 *   BackButton.js,
 *  }
 */

import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import GeneralInput from "../components/GeneralInput";
import GeneralButton from "../components/GeneralButton";
import BackButton from "../components/BackButton";
import api from "../api";
import { useAuth } from "../AuthContext";

/**
 * LoginScreen is a custom component that generates the login screen for SecuroChat
 * @param {object} navigation - Prop passed in from React Navigation to screen component
 */
const LoginScreen = ({ navigation }) => {
  // setting useAuth hook for userAuthentication
  const {
    setJSONWebToken,
    setGlobalClientUsername,
    setDefaultProfileColor,
    setGlobalClientID,
  } = useAuth();

  // getting and managing states for login text inputs
  const [usernameData, setUsername] = useState("");
  const [passwordData, setPassword] = useState("");

  const handleUsernameChange = (value) => {
    setUsername(value);
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleLogin = async () => {
    try {
      const apiURL = "auth/login";
      const response = await api.post(apiURL, {
        username: usernameData,
        password: passwordData,
      });

      setJSONWebToken(response.data.token);
      setGlobalClientUsername(usernameData);
      setDefaultProfileColor(response.data.iconColor);
      setGlobalClientID(response.data.userID);
      return true;
    } catch (error) {
      console.error("Error during login: ", error);
      return false;
    }
  };

  const handleLoginPress = async () => {
    if (await handleLogin()) {
      navigation.navigate("TabScreen");
    }
  };

  const {
    fullPage,
    backButton,
    introTop,
    introBottom,
    header,
    infoSet,
    finishButton,
    passwordForgot,
    subText,
    link,
    bottomText,
    footerContainer,
  } = styles;
  return (
    <SafeAreaView style={fullPage}>
      <StatusBar></StatusBar>
      <BackButton
        style={backButton}
        onPress={() => navigation.goBack()}
      ></BackButton>

      <View style={header}>
        <Text style={introTop}>Welcome back to</Text>
        <Text style={introBottom}>SecuroChat</Text>
      </View>
      <View style={infoSet}>
        <GeneralInput
          content="Username"
          color="#1E1E1E"
          returnKeyType={"next"}
          onInputChange={handleUsernameChange}
        ></GeneralInput>
        <GeneralInput
          content="Password"
          color="#1E1E1E"
          secureTextEntry={true}
          returnKeyType={"go"}
          onInputChange={handlePasswordChange}
        ></GeneralInput>
        <View style={finishButton}>
          <GeneralButton content="Log In" onPress={handleLoginPress} />
        </View>
        <TouchableOpacity
          style={passwordForgot}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={subText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={footerContainer}>
        <Text style={bottomText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={[bottomText, link]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullPage: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginLeft: 30,
  },
  header: {
    marginTop: 30,
    alignItems: "center",
  },
  introTop: {
    color: "#1E1E1E",
    fontSize: 30,
    fontFamily: "RobotoCondensed_700Bold",
  },
  introBottom: {
    color: "#0078D4",
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 40,
  },
  infoSet: {
    flex: 15,
    marginTop: 30,
    rowGap: 15,
  },
  passwordForgot: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  subText: {
    fontSize: 18,
    color: "#808080",
    fontFamily: "RobotoCondensed_400Regular",
  },
  bottomText: {
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 16,
  },
  link: {
    fontFamily: "RobotoCondensed_700Bold",
    color: "#0078D4",
  },
  footerContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
});

export default LoginScreen;
