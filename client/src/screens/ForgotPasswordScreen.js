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
import { Ionicons } from "@expo/vector-icons";

const ForgotPasswordScreen = ({ navigation }) => {
  const [textContent, setTextContent] = useState("");
  const handleTextChange = (value) => {
    setTextContent(value);
  };
  const {
    fullPage,
    backButton,
    subText,
    forgotPassword,
    topText,
    reset,
    buttons,
    icon,
    lineBase,
    line,
    newAccount,
    bottomText,
    footer,
    lineText,
    footerContainer,
  } = styles;
  return (
    <SafeAreaView style={fullPage}>
      <StatusBar></StatusBar>
      <BackButton
        style={backButton}
        onPress={() => navigation.goBack()}
      ></BackButton>

      <View style={icon}>
        <Ionicons name="ios-lock-closed-outline" size={60} color="black" />
      </View>

      <View style={topText}>
        <Text style={forgotPassword}>Forgot password?</Text>
        <View>
          <Text style={subText}>Enter your username or phone number</Text>
          <Text style={subText}>to reset your password</Text>
        </View>
      </View>

      <View style={buttons}>
        <View>
          <GeneralInput
            content="Username or Phone Number"
            color="#1E1E1E"
            returnKeyType={"go"}
            onInputChange={handleTextChange}
          />
        </View>
        <View style={reset}>
          <GeneralButton content="Reset Password" />
        </View>
        <View style={lineBase}>
          <View style={line}></View>
          <Text style={lineText}>Or</Text>
          <View style={line}></View>
        </View>
        <TouchableOpacity
          style={bottomText}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={newAccount}>Create new account</Text>
        </TouchableOpacity>
      </View>
      <View style={footerContainer}>
        <Text style={newAccount}>Return to </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
          <Text style={[footer, newAccount]}>login</Text>
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
  subText: {
    fontSize: 16,
    color: "#808080",
    fontFamily: "RobotoCondensed_400Regular",
    textAlign: "center",
  },
  forgotPassword: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "RobotoCondensed_700Bold",
  },
  topText: {
    flex: 5,
    marginTop: 20,
    alignItems: "center",
  },
  bottomText: {
    alignItems: "center",
    paddingTop: 15,
  },
  reset: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  buttons: {
    flex: 22,
  },
  icon: {
    paddingTop: 10,
    flex: 3,
  },
  lineBase: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    paddingHorizontal: 10,
  },
  line: {
    flex: 1,
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#C0C0C0",
    marginHorizontal: 10,
  },
  lineText: {
    fontFamily: "RobotoCondensed_400Regular",
  },
  newAccount: {
    fontSize: 18,
    fontFamily: "RobotoCondensed_700Bold",
  },
  footer: {
    color: "#0078D4",
  },
  footerContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
});

export default ForgotPasswordScreen;
