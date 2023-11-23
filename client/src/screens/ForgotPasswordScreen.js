import React from "react";
import { SafeAreaView, View, Text, StyleSheet, StatusBar, Image } from "react-native";
import GeneralInput from "../components/GeneralInput";
import GeneralButton from "../components/GeneralButton";
import BackButton from "../components/BackButton";
import { Ionicons } from '@expo/vector-icons';

const ForgotPasswordScreen = ({ navigation }) => {
    const{
        fullPage,
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
    } = styles;
    return (
        <SafeAreaView style={fullPage}>
            <StatusBar></StatusBar>
            <BackButton onPress={() => navigation.goBack()}></BackButton>

            <View style={icon}>
                <Ionicons name="ios-lock-closed-outline" size={60} color="black" />
            </View>

            <View style={topText}>
                <Text style={forgotPassword}>
                    Forgot password?
                </Text>
                <View>
                    <Text style={subText}>
                        Enter your username or phone number
                    </Text>
                    <Text style={subText}>
                        to receive a link to reset your password.
                    </Text>
                </View>
            </View>

            <View style={buttons}>
                <View>
                    <GeneralInput
                    content="Username or Phone Number"
                    color="#1E1E1E"
                    />
                </View>
                <View style={reset}>
                    <GeneralButton
                    content="Reset Password"
                    />
                </View>
                <View style={lineBase}>
                    <View style={line}></View>
                    <Text style={lineText}>
                        Or
                    </Text>
                    <View style={line}></View>
                </View>
                <View style={bottomText}>
                    <Text style={newAccount} onPress={() => navigation.navigate("SignUp")}>
                        Create new account
                    </Text>
                </View>
            </View>
            <View>
                <Text style={newAccount}>
                    Return to <Text style={footer} onPress={() => navigation.navigate("LogIn")}>login</Text>
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    fullPage: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },
    subText: {
        fontSize: 16,
        color: "#808080",
        fontFamily: "RobotoCondensed_400Regular",
    },
    forgotPassword: {
        fontSize: 20,
        marginBottom: 10,
        fontFamily: "RobotoCondensed_700Bold",
    },
    topText: {
        flex: 5,
        marginTop: 30,
        alignItems: "center"
    },
    bottomText: {
        flex: 6,
        alignItems: "center",
        paddingTop: 15,
    },
    reset: {
        paddingTop: 15,
        paddingBottom: 15,
    },
    buttons: {
        flex: 20,
    },
    icon: {
        paddingTop: 30,
        paddingBottom: 20,
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
        fontSize: 20,
        fontFamily: "RobotoCondensed_700Bold",
        paddingBottom: 20,
    },
    footer: {
        color: "#0078D4",
    },
})

export default ForgotPasswordScreen;