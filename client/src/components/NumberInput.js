import React from "react";
import { Text, StyleSheet, TextInput, View } from "react-native";

const NumberInput = (props) => {
  const { inputStyle, container } = styles;
  return (
    <View style={container}>
      <TextInput
        style={inputStyle}
        placeholder={props.content}
        placeholderTextColor={props.color}
      />
      <TextInput
        style={inputStyle}
        placeholder={props.content}
        placeholderTextColor={props.color}
      />
      <TextInput
        style={inputStyle}
        placeholder={props.content}
        placeholderTextColor={props.color}
      />
      <TextInput
        style={inputStyle}
        placeholder={props.content}
        placeholderTextColor={props.color}
      />
      <TextInput
        style={inputStyle}
        placeholder={props.content}
        placeholderTextColor={props.color}
      />
      <TextInput
        style={inputStyle}
        placeholder={props.content}
        placeholderTextColor={props.color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1.5,
    borderColor: "#C0C0C0",
    width: 55, // Set the width to 60 for a square
    height: 60, // Set the height to 60 for a square
    padding: 18,
    borderRadius: 16,
    fontSize: 20,
    margin: 3, // Add some margin between the squares
  },
  container: {
    flexDirection: "row", // Display inputs horizontally
    paddingTop: 60,
  },
});

export default NumberInput;
