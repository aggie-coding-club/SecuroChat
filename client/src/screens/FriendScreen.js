/* FriendScreen.js
 * This is a custom React component generating the friends screen
 * Imports API as screen is dynamically populated depending on users current friends/requests
 * Other external custom componentes used:
 * {
 *   ProfilePicture.js
 * }
*/

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import ProfilePicture from '../components/ProfilePicture';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const FriendScreen = () => {
    const { rootContainer, header, headerIcons, sectionTitle } = styles;
    return (
        <SafeAreaView style={rootContainer}>
            <StatusBar></StatusBar>
            <View style={header}>
                <TouchableOpacity>
                    <ProfilePicture initials="CA" color="#DB1CD3" bubbleSize={40}></ProfilePicture>
                </TouchableOpacity>
                <Text style={sectionTitle}>Chats</Text>
                <View style={headerIcons}>
                    <TouchableOpacity>
                        <Feather name="camera" size={28} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="create-outline" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        paddingTop: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    sectionTitle: {
        fontFamily: "RobotoCondensed_400Regular",
        fontSize: 25,
        marginLeft: 20,
    },
    headerIcons: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    }
});

export default FriendScreen;