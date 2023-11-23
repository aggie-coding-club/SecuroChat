// ProfilePicture.js
// This is a custom React Native component that generates profile picture given specified props
// Color input required to be hex

import React from "react";
import { Text, StyleSheet, View } from "react-native";

/**
 * ProfilePicture is a component that generates a general profile picture given specified props
 * @param {object} props - The components props
 * @property {string} props.initials - The text content within the profile picture
 * @property {string} props.color - the base color of the profile picture
 * @property {number} props.bubbleSize - Sets the size of the profile picture bubble
 */
const ProfilePicture = (props) => {
  //globals defining size of textBubble and text itself
  const bubbleSize = props.bubbleSize;
  const textSize = bubbleSize * 0.5;

  const { container, initials } = styles;
  const bubbleStyle = {
    width: bubbleSize,
    height: bubbleSize,
    borderRadius: bubbleSize,
  }
  return (
    <View style={[ container, { backgroundColor: `${props.color}30` }, bubbleStyle ]}>
      <Text style={[initials, { color: props.color, fontSize: textSize }]}>
        {props.initials}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    fontFamily: "RobotoCondensed_400Regular"
  },
});

export default ProfilePicture;
