/* BackButton.js
*  This is a custom React Native Component that generates a back button
*  Uses @expo/vector-icons to generate icon 
*/

import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

/**
 * BackButton is a component that when pressed, takes user back to previous screen
 * @param {object} props - The components props
 * @property {function} props.onPress - The function to be executed when componenet is pressed
 */
const BackButton = (props) => {
    const {buttonStyle} = styles;
    return (
        <TouchableOpacity style={buttonStyle} onPress={props.onPress}>
            <Ionicons name="arrow-back-outline" size={35} color="#0078D4"/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        alignSelf: "flex-start",
        marginTop: 10,
        marginLeft: 30,
    },
});

export default BackButton;