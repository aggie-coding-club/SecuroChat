// GeneralButton.js
// This is a custom React Native component that generates a button given specified props

import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

/**
 * GeneralButton is a component that generates a unique button given specified props
 * @param {object} props - The components props
 * @param {string} props.content - The text content within the button
 * @param {function} props.onPress - function logic that executes when button is pressed
 */
const GeneralButton = (props) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity style={buttonStyle} onPress={props.onPress}>
      <Text style={textStyle}>{props.content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    fontSize: 30,
    backgroundColor: "#0078D4",
    width: 300,
    padding: 18,
    borderRadius: 16,
  },
  textStyle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});

export default GeneralButton;
