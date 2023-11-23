/* FriendScreen.js
 * This is a custom React component generating the friends screen
 * Imports API as screen is dynamically populated depending on users current friends/requests
 * Other external custom componentes used:
 * {
 *   ProfilePicture.js
 *   FriendHeader.js
 * }
*/

import React, {useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import ProfilePicture from '../components/ProfilePicture';
import FriendHeader from '../components/FriendHeader';
import FriendEntry from '../components/FriendEntry';
import { Ionicons } from '@expo/vector-icons';

/**
 * Custom React native component responsible for rendering friend screen for each respective user
 * @param {object} navigation - navigation object acquired through react navigation for stack navigation
 */
const FriendScreen = ({ navigation }) => {
    // handling state arrays for user's friends/requests
    const [onlineFriends, setOnlineFriends] = useState([]);
    const [offlineFriends, setOfflineFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);

    const { rootContainer, header, headerIcons, sectionTitle, emptyFriends, emptyText, friendSection, requestSection, onlineSection, offlineSection } = styles;
    return (
            <SafeAreaView style={rootContainer}>
                <StatusBar></StatusBar>
                <View style={header}>
                    <TouchableOpacity>
                        <ProfilePicture initials="CA" color="#DB1CD3" bubbleSize={45}></ProfilePicture>
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

                {(onlineFriends.length + offlineFriends.length + friendRequests.length) === 0 && (
                    <View style={emptyFriends}>
                        <Text style={emptyText}>Add some friends and start</Text>
                        <Text style={emptyText}>chatting!</Text>
                    </View>
                )} 

                {(onlineFriends.length + offlineFriends.length + friendRequests.length > 0) && (
                    <ScrollView style={friendSection}>
                        <View style={requestSection}>
                            <FriendHeader headerTitle={'Requests'} amount={1} />
                            <View>
                                <FriendEntry 
                                    initials={'BE'} 
                                    color={'#DB1CD3'} 
                                    bubbleSize={45} 
                                    username={'BobEast12'}
                                    isRequest={true}
                                />
                            </View>
                        </View>
                        <View style={onlineSection}>
                            <FriendHeader headerTitle={'Online'} amount={2} />
                            <View>
                                <FriendEntry 
                                    initials={'BE'} 
                                    color={'#1CDB24'} 
                                    bubbleSize={45} 
                                    username={'BobEast12'}
                                    isRequest={false}
                                />
                                <FriendEntry 
                                    initials={'BE'} 
                                    color={'#DB1C3F'} 
                                    bubbleSize={45} 
                                    username={'BobEast12'}
                                    isRequest={false}
                                />
                            </View>
                        </View>
                        <View style={offlineSection}>
                            <FriendHeader headerTitle={'Offline'} amount={1} />
                            <View>
                                <FriendEntry 
                                    initials={'BE'} 
                                    color={'#DBD31C'} 
                                    bubbleSize={45} 
                                    username={'BobEast12'}
                                    isRequest={false}
                                />
                            </View>
                        </View>
                    </ScrollView>
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