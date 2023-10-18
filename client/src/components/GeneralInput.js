// GeneralInput.js
// A custom React Native component that generates input boxes based on passed in props

import React from "react";
import { Text, StyleSheet, TextInput } from "react-native";

/**
 * GeneralInput is a custom component that generates unique TextInputs through passed in props.
 * @param {object} props - The component's props
 * @param {string} props.content - The placeholder content for the input textbox
 * @param {string} props.color - The color of placeholder text
 */
const GeneralInput = (props) => {
    const { inputStyle } = styles;
    return (
        <TextInput
            style={inputStyle}
            placeholder={props.content}
            placeholderTextColor={props.color}
        />
    );
}

const styles = StyleSheet.create({
    inputStyle: {
        borderWidth: 1.5,
        borderColor: "#C0C0C0",
        width: 300,
        padding: 18,
        borderRadius: 16,
        fontSize: 20,
    }
});

export default GeneralInput;