// ActivityIndicator.js
// This is a custom React Native component that generates activity indicator circle with color depending on user activity

import React from "react";
import { StyleSheet, View } from "react-native";

/**
 * Custom React Native component responsible for generating activity indicator icon with color depending on user's status
 * @param {object} props - The components props
 * @property {boolean} props.isOnline - boolean representing users online status
 */
const ActivityIndicator = (props) => {
    const iconColor = props.isOnline ? "#42DB1C" : "#FF4D41";
    const { circle } = styles;
    return(
        <View style={[circle, {backgroundColor: iconColor}]}></View>
    );
};

const styles = StyleSheet.create({
    circle: {
        width: 8,
        height: 8,
        borderRadius: 50,
    }
});

export default ActivityIndicator;