// LoginScreen.js

import React from "react";
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from "react-native";
import GeneralInput from "../components/GeneralInput";
import GeneralButton from "../components/GeneralButton";
import BackButton from "../components/BackButton";

const LoginInScreen = ({ navigation }) => {
    const {
        fullPage,
        introTop,
        introBottom,
        header,
        infoSet,
        finishButton,
        passwordForgot,
        subText,
        link,
        bottomText,
    } = styles;
    return (
    <SafeAreaView style={fullPage}>
        <StatusBar></StatusBar>
        <BackButton onPress={() => navigation.goBack()}></BackButton>

        <View style={header}>
            <Text style={introTop}>
                Welcome back to
            </Text>
            <Text style={introBottom}>
                SecuroChat
            </Text>
        </View>
        <View style={infoSet}>
            <GeneralInput 
            content="Username or Phone number"
            color="#1E1E1E"
            ></GeneralInput>
            <GeneralInput 
            content="Password"
            color="#1E1E1E"
            secureTextEntry={true}
            ></GeneralInput>
            <View style={finishButton}>
                <GeneralButton
                    content="Get Started"
                 />
            </View>
            <View style={passwordForgot}>
                <Text style={subText}>
                    Forgot Password?
                </Text>
            </View>
        </View>
        <View>
            <Text style={bottomText}>
                Don't have an account? <Text style={link} onPress={() => navigation.navigate("SignUp")}>Sign Up</Text>
            </Text>
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    fullPage: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },
    introTop: {
        paddingTop: 50,
        alignItems: "center",
        color: "#1E1E1E",
        fontSize: 25,
        fontFamily: "RobotoCondensed_700Bold",
        paddingLeft: 5,
    },
    introBottom: {
        color: "#0078D4",
        fontFamily: "RobotoCondensed_700Bold",
        fontSize: 50,
        alignItems: "center",
    },
    header: {
        margin: 50,
        flex: 3,
        textAlign: "left",
    },
    infoSet: {
        flex: 15,
        marginTop: 60,
        rowGap: 15,
    },
    finishButton: {
        marginTop: 20,
    },
    passwordForgot: {
        alignItems: "center",
        justifyContent: "center",
    },
    subText: {
        color: "#808080",
        fontFamily: "RobotoCondensed_400Regular",
    },
    bottomText: {
        fontFamily: "RobotoCondensed_700Bold",
        fontSize: 16,
        marginBottom: 30

    },
    link: {
        fontFamily: "RobotoCondensed_700Bold",
        color: "#0078D4",
    }
})

export default LoginInScreen