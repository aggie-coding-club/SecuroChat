/* BackButton.js
*  This is a custom React Native Component that generates a back button
*  Uses @expo/vector-icons to generate icon 
*/

import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

/**
 * BackButton is a component that when pressed, takes user back to previous screen
 * @param {object} props - The components props
 * @property {function} props.onPress - The function to be executed when componenet is pressed
 * @property {object} props.style - styling for the button
 */
const BackButton = (props) => {
    return (
        <TouchableOpacity style={props.style} onPress={props.onPress}>
            <Ionicons name="arrow-back-outline" size={35} color="#0078D4"/>
        </TouchableOpacity>
    );
};


export default BackButton;