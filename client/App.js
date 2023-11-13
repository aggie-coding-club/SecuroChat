// App.js
// Main React Native  component resonsible for rendering all other components 
// controls Screen navigation through React Navigation screen stack 

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useFonts, RobotoCondensed_400Regular, RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed';
import SignupScreen from './src/screens/SignupScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import PhoneVerificationScreen from './src/screens/PhoneVerificationScreen';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  //logic ensuring font has be loaded successfully before rendiering application
  let [fontsLoaded, fontError] = useFonts({
    RobotoCondensed_400Regular,
    RobotoCondensed_700Bold
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer initialRouteName="Home">
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={SignupScreen}/>
        <Stack.Screen name="SignUp" component={CreateAccountScreen}/>
        <Stack.Screen name="PhoneVerification" component={PhoneVerificationScreen} />
        <Stack.Screen name="LogIn" component={LoginScreen}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;