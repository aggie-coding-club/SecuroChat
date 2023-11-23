/* ConversationTab.js
 * This is a custom React component generating the a conversation tab given distinct props
 * Other external custom componentes used:
 * {
 *   ProfilePicture.js
 *   MessagesToRead.js
 * }
*/

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProfilePicture from '../components/ProfilePicture';
import MessagesToRead from '../components/MessagesToRead';

/**
 * Custom react native component responsible for rendering conversations on user's home screen
 * @param {object} props - Javascript object containing react native props
 * @property {string} props.initials - string initials to populate user profile
 * @property {string} props.color - hexadecimal representation of color to fill in user profile
 * @property {string} props.bubbleSize - Sets the size of the profile picture bubble
 * @property {string} props.prevMessage - string filling in last message sent in conversation
 * @property {string} props.title - string forming name of conversation
 * @property {boolean} props.notSeen - boolean being true if user has chats not yet read, false otherwise
 * @property {string} props.lastMessageTime - string showing time of last sent message
 * @property {string} props.lastDate - string representing date of last message sent if user has seen all messages
 * @property {number} props.numMessagesNotRead - number representing number of messages user has not read
 * @property {boolean} props.withinTheDay - boolean representation of if the current calendar date is the same day at which the last message in conversation was received
 * @property {function} props.onPress - function that is called onPress
 */
const ConversationTab = (props) => {
    const seenValue = props.withinTheDay ? props.lastMessageTime : props.lastDate;
    const seenFontSize = props.withinTheDay ? 18 : 17;

    const {container, conversationContent, conversationTitle, conversationText, unreadConversationInfo, unreadConversationTime, readConversationInfo, readConversationTime } = styles;
    return (
        <TouchableOpacity style={container} onPress={props.onPress}>
            <ProfilePicture initials={props.initials} color={props.color} bubbleSize={props.bubbleSize} ></ProfilePicture>
            <View style={conversationContent}>
                <Text style={conversationTitle}>{props.title}</Text>
                <Text style={conversationText}>{props.prevMessage}</Text>
            </View>
            {props.notSeen && (
                <View style={unreadConversationInfo}>
                    <Text style={unreadConversationTime}>{props.lastMessageTime}</Text>
                    <MessagesToRead numMessagesNotRead={props.numMessagesNotRead} bubbleSize={25} />
                </View>
            )}
            {!props.notSeen && (
                <View style={readConversationInfo}>
                    <Text style={[readConversationTime, {fontSize: seenFontSize}]}>{seenValue}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomColor: '#C0C0C0',
        borderBottomWidth: 0.5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
    },
    conversationContent: {
        display: 'flex',
        flexDirection: 'column',
        width: "60%",
        gap: 10,
    },
    conversationTitle: {
        fontFamily: "RobotoCondensed_700Bold",
        fontSize: 18,
    },
    conversationText: {
        color: '#8C8989',
    },
    unreadConversationInfo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    unreadConversationTime: {
        color: '#0078D4',
        fontFamily: 'RobotoCondensed_400Regular',
        fontSize: 18,
    },
    readConversationInfo: {
        display: 'flex',
        alignSelf: 'flex-start',
    },
    readConversationTime: {
        color: '#8C8989',
        fontFamily: 'RobotoCondensed_400Regular',
    },
});

export default ConversationTab;