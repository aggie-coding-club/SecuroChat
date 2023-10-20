/* CloseButton.js
*  This is a custom React Native Component that generates a close button
*  Uses @expo/vector-icons to generate icon 
*/

import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';

/**
 * CloseButton is a component that when pressed, closes screen that just popped up
 * @param {object} props - The components props
 * @param {function} props.onPress - The function to be executed when componenet is pressed
 */
const BackButton = (props) => {
    const {buttonStyle} = styles;
    return (
        <TouchableOpacity style={buttonStyle} onPress={props.onPress}>
            <AntDesign name="close" size={24} color="black" />
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