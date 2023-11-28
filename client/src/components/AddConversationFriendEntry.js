/* AddConversationFriendEntry.js
 * This is a custom React component generating the AddConversationFriendEntry
 * Other external custom componentes used:
 * {
 *   ProfilePicture.js
 * }
*/

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProfilePicture from '../components/ProfilePicture';
import { Entypo } from '@expo/vector-icons';

/**
 * componenet responsible for rendering item in list within the AddConversationScreen
 * @param {object} props - js object passed into comopnent
 * @property {string} props.initials - string representing initials of user belonging to this component item
 * @property {string} props.color - hexadecimal string forming color of profile picture
 * @property {number} props.bubbleSize - number representing size of profilepicture bubble
 * @property {string} props.username - string containing username of user belonging to this component item
 * @property {boolean} props.isSelected - boolean representing whether the user is selected in AddConversationScreen
 */
const AddConversationFriendEntry = (props) => {
    const { container, mainSection, circleStyling, entryText } = styles;
    return (
        <View style={container}>
            <View style={mainSection}>
                <ProfilePicture 
                    initials={props.initials}
                    color={props.color}
                    bubbleSize={props.bubbleSize}
                />
                <Text style={entryText}>{props.username}</Text>
            </View>
            <TouchableOpacity>
                <Entypo name="circle" size={28} style={circleStyling} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 35,
    },
    mainSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    circleStyling: {
        color: '#E6E6E6',
    },
    entryText: {
        color: '#1E1E1E',
        fontFamily: 'RobotoCondensed_400Regular',
        fontSize: 22,
    }
});

export default AddConversationFriendEntry;