// GeneralButton.js
// This is a custom React Native component that generates a button given specified props

import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";

/**
 * GeneralButton is a component that generates a unique button given specified props
 * @param {object} props - The components props
 * @property {string} props.content - The text content within the button
 * @property {function} props.onPress - function logic that executes when button is pressed
 * @property {boolean} props.isInactive - determines whether button is inactive
 * @property {boolean} props.isLoading - indicates whether the button should show a loading indicator
 */
const GeneralButton = (props) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity style={[buttonStyle, props.isInactive ? { opacity: 0.5} : { opacity : 1 }]} onPress={props.onPress} disabled={props.isInactive || props.isLoading}>
      {props.isLoading ? <ActivityIndicator color={"#FFFFFF"} /> : <Text style={textStyle}>{props.content}</Text> }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    fontSize: 30,
    width: 300,
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#0078D4",
  },
  textStyle: {
    color: "#FFFFFF",
    fontSize: 24,
    textAlign: "center",
    fontFamily: "RobotoCondensed_700Bold",
  },
});

export default GeneralButton;
