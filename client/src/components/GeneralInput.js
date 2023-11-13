// GeneralInput.js
// A custom React Native component that generates input boxes based on passed in props

import React, {useState} from "react";
import { StyleSheet, TextInput } from "react-native";

/**
 * GeneralInput is a custom component that generates unique TextInputs through passed in props.
 * @param {object} props - The component's props
 * @property {string} props.content - The placeholder content for the input textbox
 * @property {string} props.color - The color of placeholder text
 * @property {function} props.onFocus - Calls function when onFocus event is triggered
 * @property {function} props.onBlur - Calls function when obBlur event is triggered
 * @property {boolean} props.secureTextEntry - Determines whether to hide entered content in text input.
 * @property {string} props.returnKeyType - Determines the type within return key of the keyboard
 * @property {string} props.keyboardType - Determines which keyboard to open on focus
 * @property {string} props.onInputChange - Function handling when input text changes which passes data to parent component
 */
const GeneralInput = (props) => {
  const [inputValue, setInputValue] = useState('');
  const handleChangeText = (text) => {
    setInputValue(text);
    props.onInputChange(text); //sends data to parent component
  }

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
      onChangeText={handleChangeText}
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
