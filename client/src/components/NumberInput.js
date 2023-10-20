import React, { useRef } from "react";
import { Text, StyleSheet, TextInput, View } from "react-native";

const NumberInput = () => {
  const { inputStyle, container } = styles;
  const inputRefs = Array(6)
    .fill(0)
    .map(() => useRef(null));

  const handleTextChange = (text, index) => {
    if (text.length === 1) {
      if (index < 5) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  return (
    <View style={container}>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={inputStyle}
            placeholder=""
            placeholderTextColor="#C0C0C0"
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(text) => handleTextChange(text, index)}
          />
        ))}
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
