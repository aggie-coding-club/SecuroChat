/* NumberInput.js
 * A custom react native component generating input boxes for phone number verification
*/

import React, { useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";

/**
 * GeneralInput is a custom component that generates unique TextInputs.
 */
const NumberInput = () => {
  const inputRefs = Array(6)
    .fill(0)
    .map(() => useRef(null));

  const handleTextInput = (text, index) => {
    if (index < 5 && text.length === 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const { inputStyle, container } = styles;
  return (
    <View style={container}>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={inputStyle}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={(text) => handleTextInput(text, index)}
            autoFocus={index === 0}
          />
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1.5,
    borderColor: "#C0C0C0",
    width: 55, 
    height: 60, 
    padding: 18,
    borderRadius: 16,
    fontSize: 20,
    margin: 3, 
  },
  container: {
    flexDirection: "row", 
    paddingTop: 60,
  },
});

export default NumberInput;
