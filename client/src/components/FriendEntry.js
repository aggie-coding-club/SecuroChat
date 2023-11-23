/* FriendEntry.js
 * This is a custom React component generating the friends screen
 * Other external custom componentes used:
 * {
 *   ProfilePicture.js
 * }
*/

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProfilePicture from './ProfilePicture';
import { AntDesign } from '@expo/vector-icons';
/**
 * Custom React Native component responsible for rendering entities of the friend screen depending on passed in props
 * @param {object} props - object containing react native props
 * @property {string} props.initials - string initials to populate user profile
 * @property {string} props.color - hexadecimal representation of color to fill in user profile
 * @property {string} props.bubbleSize - Sets the size of the profile picture bubble
 * @property {string} props.username - string representing friend's username
 * @property {boolean} props.isRequest - boolean determinining if this entity is a friend request. If so, returns true. 
 */
const FriendEntry = (props) => {
    const { container, iconContainer, containerText } = styles;
    return (
        <View style={container}>
            <ProfilePicture 
                initials={props.initials}
                color={props.color}
                bubbleSize={props.bubbleSize}
            />
            <Text style={containerText}>{props.username}</Text>

            {props.isRequest && (
                <View style={iconContainer}>
                    <TouchableOpacity>
                        <AntDesign name="closecircleo" size={28} color="#FF3D00" />   
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="checkcircleo" size={28} color="#4CAF50" />
                    </TouchableOpacity>
                </View>
            )}

            {!props.isRequest && (
                <View style={iconContainer}>
                    <TouchableOpacity>
                        <AntDesign name="phone" size={27} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="message1" size={27} color="black" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    }, 
    iconContainer: {
        flexDirection: 'row',
        gap: 18,
        marginLeft: 'auto',
    },
    containerText: {
        color: '#1E1E1E',
        fontFamily: 'RobotoCondensed_400Regular',
        fontSize: 22,
    }
});

export default FriendEntry;