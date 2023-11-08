/* ChatMessage.js
*  This is a custom React Native Component that generates a chat message
*/
import React from "react";
import { StyleSheet, View, Text } from "react-native";
/**
 * Custom React Native component that renders chat message depending on sender
 * @param {object} props - Object containing props of component
 * @property {string} props.content - String containing content of message
 * @property {boolean} props.sentByCurrUser - boolean depicting if this message belongs to client
 * @property {number} props.senderID - user id of the sender
 * 
 */
const ChatMessage = (props) => {
    //defining styles depending on if sent by current client
    const containerStyle = props.sentByCurrUser ? {
        backgroundColor: "#278EFF",
        marginLeft: '45%',
        marginRight: "5%",
        alignSelf: 'flex-end',
      } : {
        backgroundColor: "#EBE4E4",
        marginRight: '45%',
        marginLeft: '5%',
        alignSelf: 'flex-start',
      };

      const arrowStyle = props.sentByCurrUser ? {
        backgroundColor: "#278EFF",
        borderBottomLeftRadius: 25,
        right: -10,
      } : {
        backgroundColor: "#EBE4E4",
        borderBottomRightRadius: 25,
        left: -10,
      };

      const arrowOverlapStyle = props.sentByCurrUser ? {
        borderBottomLeftRadius: 18,
        right: -20
      } : {
        borderBottomRightRadius: 18,
        left : -20        
      }

      const textColor = props.sentByCurrUser ? "#FFFFFF" : "#1E1E1E";



    const { container, arrow, arrowOverlap} = styles;
    return (
        <View style={[container, containerStyle]}>
              <Text style={{ fontSize: 16, color: textColor, }} >{props.content}</Text>

              <View style={[arrow, arrowStyle]}></View>
              
              <View style={[arrowOverlap, arrowOverlapStyle]}></View>
        </View> 
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        maxWidth: '50%',
        borderRadius: 20,
    },
    arrow: {
        position: "absolute",
        width: 20,
        height: 25,
        bottom: 0,
    },
    
    arrowOverlap: {
        position: "absolute",
        backgroundColor: "#FFFFFF",
        width: 20,
        height: 35,
        bottom: -6,
    },
});

export default ChatMessage;