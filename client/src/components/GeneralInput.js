// GeneralInput.js
// A custom React Native component that generates input boxes based on passed in props

import React, {useRef} from "react";
import { StyleSheet, TextInput } from "react-native";

/**
 * GeneralInput is a custom component that generates unique TextInputs through passed in props.
 * @param {object} props - The component's props
 * @param {string} props.content - The placeholder content for the input textbox
 * @param {string} props.color - The color of placeholder text
 * @param {function} props.onFocus - Calls function when onFocus event is triggered
 * @param {function} props.onBlur - Calls function when obBlur event is triggered
 * @param {boolean} props.secureTextEntry - Determines whether to hide entered content in text input.
 * @param {string} props.returnKeyType - Determines the type within return key of the keyboard
 * @param {string} props.keyboardType - Determins which keyboard to open on focus
 */
const GeneralInput = (props) => {
  const { inputStyle } = styles;
  return (
    <TextInput
      style={inputStyle}
      placeholder={props.content}
      placeholderTextColor={props.color}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      secureTextEntry={props.secureTextEntry}
      textContentType="oneTimeCode"
      returnKeyType={props.returnKeyType}
      keyboardType={props.keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1.5,
    borderColor: "#C0C0C0",
    width: 300,
    padding: 18,
    borderRadius: 16,
    fontSize: 20,
  },
});

export default GeneralInput;
