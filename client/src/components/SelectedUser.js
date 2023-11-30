/* SelectedUser.js
 * This is a custom React component generating the SelectedUser in the addConversationScreen
*/

import React from 'react';
import { View, Text, StyleSheet } from "react-native";

/**
 * React native component responsible for rendering selected user within addConversation screen
 * @param {object} props - object containing passed in props
 * @property {string} props.username - string representing username to be placed into selecteduser component
 */
const SelectedUser = (props) => {
    const { container, textStyle } = styles;
    return (
        <View style={container}>
            <Text style={textStyle}>{props.username}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEEDED',
        padding: 6,
        borderRadius: 12,
        marginLeft: 8,
        marginRight: 8,
    },
    textStyle: {
        fontFamily: 'RobotoCondensed_400Regular',
        color: '#0078D4',
        fontSize: 18,
        textAlign: 'center',
    }
});

export default SelectedUser;