/* addConversationScreen.js
 * This is a custom React component generating the addConversationScreen
 * Imports API as screen is dynamically populated depending on users current friends
 * Other external custom componentes used:
 * {
 *   ProfilePicture.js
 *   AddConversationFriendEntry
 *   BackButton.js
 * }
*/

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import ProfilePicture from '../components/ProfilePicture';
import BackButton from '../components/BackButton';
import AddConversationFriendEntry from '../components/AddConversationFriendEntry';

/**
 * Custom React Native component responsible for rendering the addConversationScreen
 * @param navigation - react navigation object used for stack navigation
 */
const AddConversationScreen = ({ navigation }) => {
    const { rootContainer, backButton, header, headerTitle, participantSection, participantSectionText } = styles;
    return (
        <SafeAreaView style={rootContainer}>
            <StatusBar></StatusBar>
            <View style={header}>
                <BackButton style={backButton} onPress={() => navigation.goBack()}></BackButton>
                <Text style={headerTitle}>Select Participants</Text>
            </View>
            <View style={participantSection}>
                <Text style={participantSectionText}>To:</Text>
            </View>

            <AddConversationFriendEntry
                initials={'CA'}
                color={'#DB3E1C'}
                bubbleSize={45}
                username={'carlosra0345'}
            />
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    backButton: {
        alignSelf: "flex-start",
        marginLeft: 30,
    },
    headerTitle: {
        fontFamily: "RobotoCondensed_400Regular",
        fontSize: 25,
        marginLeft: 35,
    },
    header: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    participantSectionText: {
        color: '#A2A2A2',
        fontFamily: 'RobotoCondensed_400Regular',
        fontSize: 22,
        marginTop: 20,
        marginLeft: 35,
    }
});

export default AddConversationScreen;