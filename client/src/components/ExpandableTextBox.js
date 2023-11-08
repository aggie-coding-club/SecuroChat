/* ExpandableTextBox.js
*  This component renders the messaging textbox used in chats
*/

import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

/**
 * Custom React Native component rendering the chat message text box
 * @param {object} props - Object containing props for component
 * @property {function} props.callbackText - function returning current text in textinput to parent component
 * @property {string} props.currentValue - string represneting current value of text input
 */
const ExpandableTextBox = (props) => {
    const [textData, setTextData ] = useState('');

    const { inputStyle } = styles;
    return(
        <TextInput 
            placeholder="Message"
            multiline={true}
            style={[inputStyle, {maxHeight: 85}]}
            backgroundColor="#FFFFFF"
            onChangeText={props.callbackText}
            value={props.currentValue}
        />
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        borderWidth: 1.5,
        borderColor: "#C0C0C0",
        width: 285,
        borderRadius: 16,
        padding: 8,
        fontSize: 16,
        backgroundColor: "black"
    }
})

export default ExpandableTextBox;