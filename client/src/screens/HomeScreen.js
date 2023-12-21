/* HomeScreen.js
 * This is a custom React component generating the createAccountScreen
 * Imports API as screen is dynamically populated depending on users current conversations
 * Other external custom componentes used:
 * {
 *   ProfilePicture.js
 *   ConversationTab.js
 * }
*/

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import ProfilePicture from '../components/ProfilePicture';
import ConversationTab from '../components/ConversationTab';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import api from '../api';
import { useAuth } from '../AuthContext';


/**
 * Custom React Native component responsible for rendering the home chat screen for each respective user
 * @param navigation - react navigation object used for stack navigation
 */
const HomeScreen = ({ navigation }) => {
    // retrieving userToken and globalClientUsername with useAuth
    const { token, globalClientUsername, defaultProfileColor } = useAuth(); 

    const navigateToStack = () => {
        const parameters = {
            isChatCreated: true,
        };
        navigation.navigate("ChatScreen", parameters);
    };

    // array of objects with properties: conversationName, lastMessageData, userInfo
    const [conversations, setConversations] = useState([]);

    // function responsible for fetching user's conversation data
    const getUserConversationData = async () => {
        try {
            const apiURL = "/conversations/fetchUserConversations";
            const response = await api.get(apiURL, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
            setConversations(response.data.userConversations);
            return true;
        } 
        catch (error) {
            console.error(
                "Error while rendering user's conversations on home screen: ",
                error
              );
              return false;
        }
    };

  // initializing user's conversations data upon component mount with useEffect
  useEffect(() => {
    getUserConversationData();

    // setting up periodic updates with set Interval
    const intervalID = setInterval(() => {
      getUserConversationData();
    }, 10000); // fetches updated every second

    // cleanup function preventing memory leaks
    return () => {
      clearInterval(intervalID);
    };
  }, []);

    const { rootContainer, header, headerIcons, sectionTitle, scrollSection, emptySection, emptyText, sparkleText } = styles;
    return (
        <SafeAreaView style={rootContainer}>
            <StatusBar></StatusBar>
            <View style={header}>
                <TouchableOpacity>
                    <ProfilePicture initials={globalClientUsername.substring(0,2).toUpperCase()} color={defaultProfileColor} bubbleSize={30}></ProfilePicture>
                </TouchableOpacity>
                <Text style={sectionTitle}>Chats</Text>
                <View style={headerIcons}>
                    <TouchableOpacity>
                        <Feather name="camera" size={28} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("AddConversation")}>
                        <Ionicons name="create-outline" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            {conversations.length > 0 && (
                <ScrollView style={scrollSection}>
                    {conversations.map((item, index) => (
                        <ConversationTab 
                            key={index}
                            conversationObject={item}
                            bubbleSize={45}
                            numMessagesNotRead={3}
                            notSeen={true}
                            onPress={navigateToStack}
                        />
                    ))}
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