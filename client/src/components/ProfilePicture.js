// ProfilePicture.js
// This is a custom React Native component that generates profile picture given specified props
// Color input required to be hex

import React from "react";
import { Text, StyleSheet, View } from "react-native";

/**
 * ProfilePicture is a component that generates a general profile picture given specified props
 * @param {object} props - The components props
 * @param {string} props.initials - The text content within the profile picture
 * @param {string} props.color - the base color of the profile picture
 */
const ProfilePicture = (props) => {
  const { container, initials } = styles;
  return (
    <View style={[ container, { backgroundColor: `${props.color}30` } ]}>
      <Text style={[initials, { color: props.color }]}>
        {props.initials}
      </Text>
    </View>
  );
};

//globals defining size of textBubble and text itself
const bubbleSize = 60;
const textSize = bubbleSize * 0.5;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: bubbleSize,
    height: bubbleSize,
    borderRadius: bubbleSize,
  },
  initials: {
    fontSize: textSize,
    fontFamily: "RobotoCondensed_400Regular"
  },
});

export default ProfilePicture;
