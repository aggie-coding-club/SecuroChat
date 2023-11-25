/* MessagesToRead.js
 * This is a custom React component generating the component showing number of messages left to read per conversation
*/

import React from 'react';
import { View, Text, StyleSheet} from "react-native";

/**
 * Custom component that renders the number of messages not yet read in a conversation by the user
 * @param {object} props - javascript object containing props
 * @property {number} props.numMessagesNotRead - number representing number of messages not yet read in the conversation
 * @property {number} props.bubbleSize - Sets the size of the MessageToRead bubble
 */
const MessagesToRead = (props) => {
    const bubbleSize = props.bubbleSize;
    const textSize = bubbleSize * 0.65;

    const bubbleStyle = {
        width: bubbleSize,
        height: bubbleSize,
        borderRadius: bubbleSize,
    };
    const { container, initials } = styles;
    return (
        <View style={[ container, bubbleStyle ]}>
           <Text style={[initials, { fontSize: textSize }]}>{props.numMessagesNotRead}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0078D4",
      },
    initials: {
        fontFamily: "RobotoCondensed_400Regular",
        color: "#FFFFFF",
      },
});

export default MessagesToRead;