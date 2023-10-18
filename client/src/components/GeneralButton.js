import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const GeneralButton = (props) => {
    const { buttonStyle,textStyle } = styles;
    return (
        <TouchableOpacity style={buttonStyle}>
            <Text style={textStyle}>
                {props.content}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        fontSize: 30,
        backgroundColor: '#0078D4',
        width: 300,
        padding: 18,
        borderRadius: 16,
    },
    textStyle: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    }
});


export default GeneralButton;