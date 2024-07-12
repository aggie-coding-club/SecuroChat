import React, { useState } from "react";
import { Text } from "react-native";
import { Snackbar } from 'react-native-paper';

/**
 * Popup snackbar using react-native-paper
 * @param {object} props - The component's props
 * @param {string} content - Text content in snackbar popup
 * @param {boolean} isVisible - Shows snackbar
 * @param {function} onClose - Function to call when the snackbar is dismissed
 */
const Popup = ({ content, isVisible, onClose }) => {
  return (
    <Snackbar
      style={{
        marginBottom: 700,
        backgroundColor: "red",
        width: "90%",
        alignSelf: "center",
      }}
      visible={isVisible}
      onDismiss={onClose}
      action={{
        label: 'Exit',
        onPress: onClose,
      }}
    >
      <Text style={{
        fontFamily: "RobotoCondensed_700Bold",
        fontSize: 15,
        color: "#FFFFFF",
        textAlign: "center"
      }}>
        {content}
      </Text>
    </Snackbar>
  );
};

export default Popup;
