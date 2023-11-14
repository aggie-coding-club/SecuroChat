/* FriendHeader.js
 * This is a custom React component generating the header for a friends section such as requests, online, offline
*/

import React from 'react';
import { View, Text, StyleSheet } from "react-native";

/**
 * Custom react native components that renders headers for friends screen such as Requests, Online, and Offline
 * @param {object} props - javascript object containing props
 * @property {string} props.headerTitle - String creating title of the friends header
 * @property {number} props.amount - represents number of users belonging to specific friends header category
 */
const FriendHeader = (props) => {
    const { container, headerText } = styles;
    return (
        <View style={container}>
            <Text style={headerText}>{`${props.headerTitle} - ${props.amount}`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderBottomColor: '#C0C0C0',
        borderBottomWidth: 0.5,
    },
    headerText: {
        color: '#1E1E1E',
        fontFamily: 'RobotoCondensed_700Bold',
        fontSize: 25,
    }
});

export default FriendHeader;