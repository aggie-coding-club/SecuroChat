/* HomeScreen.js
 * This is a custom React component generating the createAccountScreen
 * Imports API as screen is dynamically populated depending on users current conversations
 * Other external custom componentes used:
 * {
 *   ProfilePicture.js
 *   ConversationTab.js
 * }
*/

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import ProfilePicture from '../components/ProfilePicture';
import ConversationTab from '../components/ConversationTab';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


/**
 * Custom React Native component responsible for rendering the home chat screen for each respective user
 * @param navigation - react navigation object used for stack navigation
 */
const HomeScreen = ({ navigation }) => {
    const navigateToStack = () => {
        navigation.navigate("ChatScreen");
    };

    // array of objects with properties: conversationName, lastMessageData, userInfo
    const [conversations, setConversations] = useState([]);

    const { rootContainer, header, headerIcons, sectionTitle, scrollSection, emptySection, emptyText, sparkleText } = styles;
    return (
        <SafeAreaView style={rootContainer}>
            <StatusBar></StatusBar>
            <View style={header}>
                <TouchableOpacity>
                    <ProfilePicture initials="CA" color="#DB1CD3" bubbleSize={45}></ProfilePicture>
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
            {conversations.length > 0 && (
                <ScrollView style={scrollSection}>
                    <ConversationTab 
                        initials={'BE'}
                        color={'#42DB1C'} 
                        bubbleSize={45}  
                        title={"BobEast12"}
                        prevMessage={"I wanted to say that SecuroChat is so cool! I really want to use it..."}
                        lastMessageTime={"6:53 PM"}
                        numMessagesNotRead={4}
                        notSeen={true}
                        onPress={navigateToStack}
                    />
                    <ConversationTab 
                        initials={'JB'}
                        color={'#DB1C3F'} 
                        bubbleSize={45}  
                        title={"JohnnyBravo"}
                        prevMessage={"Yo How you doing. What you doing later..."}
                        lastMessageTime={"6:30 PM"}
                        numMessagesNotRead={2}
                        lastDate={'11/10/23'}
                        notSeen={false}
                        withinTheDay={true}
                        onPress={navigateToStack}
                    />
                </ScrollView>
            )}
            {conversations.length === 0 && (
                <View style={emptySection}>
                    <Text style={emptyText}>Watch this space light up</Text>
                    <Text style={emptyText}>with messages as you start</Text>
                    <Text style={emptyText}>chattin' away</Text>
                    <Text style={sparkleText}>&#x2728;</Text>
                </View>
            )}
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
        paddingBottom: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    sectionTitle: {
        fontFamily: "RobotoCondensed_400Regular",
        fontSize: 25,
        marginLeft: 35,
    },
    headerIcons: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 25,
    },
    emptySection: {
        flex: 0.75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#A2A2A2',
        fontFamily: 'RobotoCondensed_700Bold',
        fontSize: 20,
    },
    sparkleText: {
        marginTop: 10,
        fontSize: 30,
    }
});

export default HomeScreen;