// PhoneVerficiationScreen.js
// This is a custome React Native component that generates the Phone Verification Screen
//
import React from "react";
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView } from "react-native";

import NumberInput from "../components/NumberInput";
import BackButton from "../components/BackButton";

const PhoneVerificationScreen = ( {navigation} ) => {
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
      <BackButton onPress={() => navigation.navigate("SignUp")}></BackButton>
      <View style={pageHeader}>
        <Text style={veriPhone}>Verify your Number</Text>
        <Text style={enterCodeText}>
          Enter the 6-digit code we sent to your phone
        </Text>
      </View>

      <View style={containers}>
        <NumberInput content="" color="#1E1E1E"></NumberInput>
      </View>
      <KeyboardAvoidingView behavior="position">
        <Text style={loginInfo}>
          Didn't get a code? <Text style={inlineLink}>Resend the code</Text>
        </Text>
      </KeyboardAvoidingView>
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
    marginBottom: 30,
    fontFamily: "RobotoCondensed_700Bold",
  },
  inlineLink: {
    color: "#0078D4",
    fontFamily: "RobotoCondensed_700Bold",
  },
});

export default PhoneVerificationScreen;
