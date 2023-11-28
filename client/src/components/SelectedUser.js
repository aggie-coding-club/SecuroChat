/* SelectedUser.js
 * This is a custom React component generating the SelectedUser in the addConversationScreen
*/

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from "react-native";

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
        width: 120,
        padding: 4,
        borderRadius: 12,
    },
    textStyle: {
        fontFamily: 'RobotoCondensed_400Regular',
        color: '#0078D4',
        fontSize: 18,
        textAlign: 'center',
    }
});

export default SelectedUser;