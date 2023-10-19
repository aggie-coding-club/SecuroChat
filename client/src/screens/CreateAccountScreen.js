/* CreateAccountScreen.js
* This is a custom React component generating the createAccountScreen
* Renders the entire screen and uses the following external custom components 
*  { 
*   GeneralInput.js,
*   GeneralButton.js,
*   BackButton.js 
*  }
*/

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import GeneralInput from '../components/GeneralInput';
import GeneralButton from '../components/GeneralButton';
import BackButton from '../components/BackButton';

/**
 * CreateAccountScreen is a custom component that generates the createAccount screen for SecuroChat
 * @param {object} navigation - Prop passed in from React Navigation to screen component
 */
const CreateAccountScreen = ({ navigation }) => {
    const { rootContainer, pageHeader, welcomeText, mainTitle, inputContainer, actionContainer, infoStyle, inlineLink, loginInfo } = styles;
    return (
        <SafeAreaView style={rootContainer}>
            <BackButton onPress={() => navigation.goBack()}></BackButton>
            <View style={pageHeader}>
                <Text style={welcomeText}>Welcome to</Text>
                <Text style={mainTitle}>SecuroChat</Text>
            </View>

            <View style={inputContainer}>
                <GeneralInput
                    content="Username"
                    color="#1E1E1E"
                ></GeneralInput>
                <GeneralInput
                    content="Phone Number"
                    color="#1E1E1E"
                ></GeneralInput>
                <GeneralInput
                    content="Password"
                    color="#1E1E1E"
                ></GeneralInput>
                <GeneralInput
                    content="Re-enter Password"
                    color="#1E1E1E"
                ></GeneralInput>
            </View>

            <View style={actionContainer}>
                <GeneralButton
                    content="Get Started"
                ></GeneralButton>
                <Text style={infoStyle}>
                    By signing up, you agree to our{" "}
                    <Text style={inlineLink}>Terms of Service</Text> and{" "}
                    <Text style={inlineLink}>Privacy Policy</Text>, including Cookie Use.
                </Text>
            </View>

            <View>
                <Text style={loginInfo}>
                    Already have an account? <Text style={inlineLink}>Log in</Text>
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
        marginTop: 40,
        flex: 3,
        alignItems: "center",
    },
    welcomeText: {
        color : "#1E1E1E",
        fontSize: 25,
        fontWeight: "bold",
    },
    mainTitle: {
        color: "#0078D4",
        fontSize: 40,
        fontWeight: "bold",
    },
    inputContainer: {
        flex: 8,
        rowGap: 15,
    },
    actionContainer: {
        flex: 5,
        rowGap: 2,
    },
    infoStyle: {
        marginTop: 10,
        fontSize: 15,
        width: 300,
        textAlign: "center",
    },
    inlineLink: {
        color: "#0078D4",
        fontWeight: "bold",
    },
    loginInfo: {
        fontSize: 16,
        marginBottom: 20,
        fontWeight: "bold",
    },
});

export default CreateAccountScreen;