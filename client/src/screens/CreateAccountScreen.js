/* CreateAccountScreen.js
 * This is a custom React component generating the createAccountScreen
 * Other external custom componentes used:
 *  {
 *   GeneralInput.js,
 *   GeneralButton.js,
 *   BackButton.js,
 *  }
 */

import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import GeneralInput from "../components/GeneralInput";
import GeneralButton from "../components/GeneralButton";
import BackButton from "../components/BackButton";

/**
 * CreateAccountScreen is a custom component that generates the createAccount screen for SecuroChat
 * @param {object} navigation - Prop passed in from React Navigation to screen component
 */
const CreateAccountScreen = ({ navigation }) => {
  //handling state deciding whether to show or hide pageHeader
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const hideHeader = () => {
    setIsHeaderHidden(true);
  };
  const showHeader = () => {
    setIsHeaderHidden(false);
  };

  const {
    rootContainer,
    backButton,
    pageHeader,
    welcomeText,
    mainTitle,
    inputContainer,
    actionContainer,
    infoStyle,
    inlineLink,
    loginInfo,
  } = styles;
  return (
    <SafeAreaView style={rootContainer}>
      <StatusBar></StatusBar>
      <BackButton style={backButton} onPress={() => navigation.goBack()}></BackButton>

      {/*This evaluates state and decides generation of header content */}
      {!isHeaderHidden && (
        <View style={pageHeader}>
          <Text style={welcomeText}>Welcome to</Text>
          <Text style={mainTitle}>SecuroChat</Text>
        </View>
      )}
      <View style={inputContainer}>
        <GeneralInput
          content="Username"
          color="#1E1E1E"
          onFocus={hideHeader}
          onBlur={showHeader}
          returnKeyType={"next"}
        ></GeneralInput>
        <GeneralInput
          content="Phone Number"
          color="#1E1E1E"
          onFocus={hideHeader}
          onBlur={showHeader}
          returnKeyType={"next"}
          keyboardType={"phone-pad"}
        ></GeneralInput>
        <GeneralInput
          content="Password"
          color="#1E1E1E"
          onFocus={hideHeader}
          onBlur={showHeader}
          secureTextEntry={true}
          returnKeyType={"next"}
        ></GeneralInput>
        <GeneralInput
          content="Re-enter Password"
          color="#1E1E1E"
          onFocus={hideHeader}
          onBlur={showHeader}
          secureTextEntry={true}
          returnKeyType={"go"}
        ></GeneralInput>
        <View style={actionContainer}>
          <GeneralButton
            content="Register"
            onPress={() => navigation.navigate("ChatScreen")}
          ></GeneralButton>
          <Text style={infoStyle}>
            By signing up, you agree to our{" "}
            <Text style={inlineLink}>Terms of Service</Text> and{" "}
            <Text style={inlineLink}>Privacy Policy</Text>
          </Text>
        </View>
      </View>

      <View>
        <Text style={loginInfo}>
          Already have an account? <Text style={inlineLink} onPress={() => navigation.navigate("LogIn")}>Log in</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
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
  inputContainer: {
    flex: 15,
    marginTop: 30,
    rowGap: 15,
  },
  actionContainer: {
    flex: 5,
    rowGap: 2,
  },
  infoStyle: {
    marginTop: 15,
    fontSize: 15,
    width: 300,
    textAlign: "center",
    fontFamily: "RobotoCondensed_400Regular",
  },
  inlineLink: {
    color: "#0078D4",
    fontFamily: "RobotoCondensed_700Bold",
  },
  loginInfo: {
    fontSize: 16,
    marginBottom: 30,
    fontFamily: "RobotoCondensed_700Bold",
  },
});

export default CreateAccountScreen;
