import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './src/screens/SignupScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer initialRouteName="Home">
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={SignupScreen}/>
        <Stack.Screen name="SignUp" component={CreateAccountScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;