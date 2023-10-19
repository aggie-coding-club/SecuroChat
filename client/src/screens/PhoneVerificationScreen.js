// PhoneVerficiationScreen.js
// This is a custome React Native component that generates the Phone Verification Screen
// 
import react from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput
} from "react-native";
import NumberInput from '../components/NumberInput';

const PhoneVerificationScreen = () => {
    const {veriPhone, enterCodeText, rootContainer, pageHeader, containers} = styles;
    return (
        <SafeAreaView style={rootContainer}>
            
            <View style={pageHeader}>
                <Text style={veriPhone}>Verify your Number</Text>
                <Text style={enterCodeText}>Enter the 6-digit code we sent to your phone</Text>
            </View>
            
            <View style={containers}>
                <NumberInput
                    content = ""
                    color = "#1E1E1E"
                ></NumberInput>
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
        fontWeight: "bold",
        paddingTop: 150,
    },
    enterCodeText: {
        //color: "#000000"
        color: "#1E1E1E",
        fontSize: 18,
        fontWeight: "bold",
        paddingTop: 20,
        },
    containers: {
        //TODO
        paddingTop: 20,
        flex: 8,
        rowGap: 15,
    }
});

export default PhoneVerificationScreen;