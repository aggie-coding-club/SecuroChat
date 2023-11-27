/* FriendScreen.js
 * This is a custom React component generating the friends screen
 * Imports API as screen is dynamically populated depending on users current friends/requests
 * Other external custom componentes used:
 * {
 *   ProfilePicture.js
 *   FriendHeader.js
 * }
*/

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import ProfilePicture from '../components/ProfilePicture';
import FriendHeader from '../components/FriendHeader';
import FriendEntry from '../components/FriendEntry';
import { Ionicons } from '@expo/vector-icons';
import api from '../api';
import { useAuth } from '../AuthContext';

/**
 * Custom React native component responsible for rendering friend screen for each respective user
 * @param {object} navigation - navigation object acquired through react navigation for stack navigation
 */
const FriendScreen = ({ navigation }) => {
    // retrieving userToken with useAuth
    const { token } = useAuth(); 

    // handling state arrays for user's friends/requests
    const [onlineFriends, setOnlineFriends] = useState([]);
    const [offlineFriends, setOfflineFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);

    // function responsible for fetching users friend data
    const getUserFriendData = async () => {
        try {
            const apiURL = '/user/fetchFriendData';
            const response = await api.get(apiURL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOnlineFriends(response.data.onlineFriends);
            setOfflineFriends(response.data.offlineFriends);
            setFriendRequests(response.data.friendRequests);
            return true;
        } 
        catch (error) {
            console.error('Error while rendering friend data on friends screen: ', error);
            return false;
        }
    };

    // initializing friend data for client upon component mount with useEffect
    useEffect(() => {
        getUserFriendData();
    }, []);

    // function responsible for choosing random color
    const randomColor = () => {
        const colorOptions = [`#0078D4`, `#DB1CD3`, `#1CDB24`, `#DB1C3F`, `#DBD31C`];
        
        // generating random index
        const randomIndex = Math.floor(Math.random() * colorOptions.length);

        return colorOptions[randomIndex];
    };

    const { rootContainer, header, headerIcons, sectionTitle, emptyFriends, emptyText, friendSection, requestSection, onlineSection, offlineSection } = styles;
    return (
            <SafeAreaView style={rootContainer}>
                <StatusBar></StatusBar>
                <View style={header}>
                    <TouchableOpacity>
                        <ProfilePicture initials="CA" color="#DB1CD3" bubbleSize={30}></ProfilePicture>
                    </TouchableOpacity>
                    <Text style={sectionTitle}>Friends</Text>
                    <View style={headerIcons}>
                        <TouchableOpacity>
                            <Ionicons name="create-outline" size={30} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("AddFriend")}>
                            <Ionicons name="ios-person-add-outline" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                {(onlineFriends.length + offlineFriends.length + friendRequests.length > 0) && (
                    <ScrollView style={friendSection}>
                        <View style={requestSection}>
                            <FriendHeader headerTitle={'Requests'} amount={friendRequests.length} />
                            <View>
                                {friendRequests.map((item, index) => (
                                    <FriendEntry
                                        key={index}
                                        initials={item.friendUsername.substring(0,2).toUpperCase()}
                                        color={randomColor()}
                                        bubbleSize={45}
                                        username={item.friendUsername}
                                        isRequest={true}
                                    />
                                ))}
                            </View>
                        </View>
                        <View style={onlineSection}>
                            <FriendHeader headerTitle={'Online'} amount={onlineFriends.length} />
                            <View>
                                {onlineFriends.map((item, index) => (
                                    <FriendEntry
                                        key={index}
                                        initials={item.friendUsername.substring(0,2).toUpperCase()}
                                        color={randomColor()}
                                        bubbleSize={45}
                                        username={item.friendUsername}
                                        isRequest={false}
                                    />
                                ))}
                            </View>
                        </View>
                        <View style={offlineSection}>
                            <FriendHeader headerTitle={'Offline'} amount={offlineFriends.length} />
                            <View>
                                {offlineFriends.map((item, index) => (
                                    <FriendEntry
                                        key={index}
                                        initials={item.friendUsername.substring(0,2).toUpperCase()}
                                        color={randomColor()}
                                        bubbleSize={45}
                                        username={item.friendUsername}
                                        isRequest={false}
                                    />
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                )}
                
                {(onlineFriends.length + offlineFriends.length + friendRequests.length) === 0 && (
                    <View style={emptyFriends}>
                        <Text style={emptyText}>Add some friends and start</Text>
                        <Text style={emptyText}>chatting!</Text>
                    </View>
                )} 
            </SafeAreaView>
    );
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
    emptyFriends: {
        flex: 0.75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#A2A2A2',
        fontFamily: 'RobotoCondensed_700Bold',
        fontSize: 20,
    }
});

export default FriendScreen;