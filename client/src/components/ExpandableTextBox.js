import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const ExpandableTextBox = () => {
    const { inputStyle } = styles;
    return(
        <TextInput 
            placeholder="Message"
            style={inputStyle}
            backgroundColor="#FFFFFF"
        />
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        borderWidth: 1.5,
        borderColor: "#C0C0C0",
        width: 285,
        borderRadius: 16,
        padding: 6,
        fontSize: 16,
        backgroundColor: "black"
    }
})

export default ExpandableTextBox;