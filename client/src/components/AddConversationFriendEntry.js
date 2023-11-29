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
import { AntDesign } from '@expo/vector-icons';

/**
 * componenet responsible for rendering item in list within the AddConversationScreen
 * @param {object} props - js object passed into comopnent
 * @property {string} props.initials - string representing initials of user belonging to this component item
 * @property {string} props.color - hexadecimal string forming color of profile picture
 * @property {number} props.bubbleSize - number representing size of profilepicture bubble
 * @property {string} props.username - string containing username of user belonging to this component item
 * @property {function} props.sendToParent - function passed in that sends data to parent
 */
const AddConversationFriendEntry = (props) => {
    // handles state determining if the entry is selected
    const [isSelected, setIsSelected] = useState(false);

    // function responsible for sending altered
    const transferData = (newIsSelected) => {
        const data = {
            entryUsername: props.username,
            isSelected: newIsSelected,
        };
        props.sendToParent(data);
    };

    // function responsible for handling ConversationFriendEntry
    const handleFriendEntryPress = () => {
        setIsSelected((prevIsSelected) => {
            const newIsSelected = !prevIsSelected;
            transferData(newIsSelected);
            return newIsSelected;
        });
    };

    const { container, mainSection, entryText, selectionContainer } = styles;
    return (
        <TouchableOpacity style={container} onPress={handleFriendEntryPress}>
            <View style={mainSection}>
                <ProfilePicture 
                    initials={props.initials}
                    color={props.color}
                    bubbleSize={props.bubbleSize}
                />
                <Text style={entryText}>{props.username}</Text>
            </View>
            <View style={selectionContainer}>
                {isSelected === false && (<Entypo name="circle" size={24} color={'#E6E6E6'} />)}
                {isSelected === true && (<AntDesign name="checkcircle" size={24} color={'#0078D4'} />)}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
    },
    mainSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginLeft: 15,
    },
    entryText: {
        color: '#1E1E1E',
        fontFamily: 'RobotoCondensed_400Regular',
        fontSize: 22,
    },
    selectionContainer: {
        marginRight: 15,
    }
});

export default AddConversationFriendEntry;