/* PhoneVerficiationScreen.js
 * This is a custome React Native component that generates the Phone Verification Screen
 * Other external custom components used:
 * {
 *    NumberInput,
 *    BackButton,
 * }
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import NumberInput from "../components/NumberInput";
import BackButton from "../components/BackButton";
import ProfilePicture from "../components/ProfilePicture";

/**
 * PhoneVerificationScreen is a custom component that generates the phone verification screen of SecuroChat
 * @param {object} navigation - Prop passed in from React Navigation to screen component
 */
const PhoneVerificationScreen = ({ navigation }) => {
  const {
    veriPhone,
    enterCodeText,
    rootContainer,
    pageHeader,
    containers,
    loginInfo,
    inlineLink,
  } = styles;
  return (
    <SafeAreaView style={rootContainer}>
      <StatusBar></StatusBar>
      <BackButton onPress={() => navigation.goBack()}></BackButton>
      <View style={pageHeader}>
        <Text style={veriPhone}>Verify your Number</Text>
        <Text style={enterCodeText}>
          Enter the 6-digit code sent to your phone
        </Text>
      </View>

      <View style={containers}>
        <NumberInput content="" color="#1E1E1E"></NumberInput>
        <Text style={loginInfo}>
          Didn't get a code? <Text style={inlineLink}>Resend the code</Text>
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
  pageHeader: {
    marginTop: 50,
    flex: 3,
    alignItems: "center",
  },
  veriPhone: {
    color: "#0078D4",
    fontSize: 30,
    paddingTop: 100,
    fontFamily: "RobotoCondensed_700Bold",
  },
  enterCodeText: {
    color: "#1E1E1E",
    fontSize: 18,
    paddingTop: 10,
    fontFamily: "RobotoCondensed_700Bold",
  },
  containers: {
    paddingTop: 10,
    flex: 8,
    rowGap: 15,
  },
  loginInfo: {
    fontSize: 16,
    fontFamily: "RobotoCondensed_700Bold",
    alignSelf: "center",
    marginTop: 20,
  },
  inlineLink: {
    color: "#0078D4",
    fontFamily: "RobotoCondensed_700Bold",
  },
});

export default PhoneVerificationScreen;
