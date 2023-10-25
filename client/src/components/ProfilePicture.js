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
    backgroundColor = props.color == undefined? hexToRgba('#00FF1B', .25) : hexToRgba(props.color, .25);
    color = props.color == undefined? darkenColor('#00FF1B', 0.5) : darkenColor(props.color, .5);
    const size = 100;
    const fontSize = size * .5;

    return (
        <View style={[styles.container, { width: size, height: size, borderRadius: size, backgroundColor}]}>
          <Text style={[styles.initials, {fontSize, color}]}>{props.initials}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    
    opacity: 1,
  },
});


/**
 * hexToRgba is a function that creates an rgba color given a hex color
 * @param {string} hex - the base color
 * @param {number} opacity - change to specified opactiy
 */
const hexToRgba = (hex, opacity) => {
  const hexColor = hex.replace(/^#/, '');
  const red = parseInt(hexColor.slice(0, 2), 16);
  const green = parseInt(hexColor.slice(2, 4), 16);
  const blue = parseInt(hexColor.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

/**
 * darkenColor darkens a certain color, used for darkening text on top of background color
 * @param {string} color - the base color
 * @param {number} factor - amount to darken by
 */
const darkenColor = (color, factor) => {
  const hexColor = color.replace(/^#/, '');
  let red = parseInt(hexColor.slice(0, 2), 16);
  let green = parseInt(hexColor.slice(2, 4), 16);
  let blue = parseInt(hexColor.slice(4, 6), 16);

  red = Math.round(red * (1 - factor));
  green = Math.round(green * (1 - factor));
  blue = Math.round(blue * (1 - factor));

  const toHex = (color) => {
    const hex = color.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }

  const redHex = toHex(red);
  const greenHex = toHex(green);
  const blueHex = toHex(blue);

  return `#${redHex}${greenHex}${blueHex}`;
};

export default ProfilePicture;