// App.js
// Main React Native  component resonsible for rendering all other components 
// controls Screen navigation through React Navigation screen stack 

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useFonts, RobotoCondensed_400Regular, RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed';
import SignupScreen from './src/screens/SignupScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import PhoneVerificationScreen from './src/screens/PhoneVerificationScreen';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ChatScreen from './src/screens/ChatScreen';
import HomeScreen from './src/screens/HomeScreen';
import FriendScreen from './src/screens/FriendScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false, 
      tabBarStyle: {backgroundColor: '#F6F6F6', height: 90,},
      tabBarShowLabel: false,
      }
    }>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
        tabBarIcon: ({ focused }) => (<AntDesign name="message1" size={35} color={focused ? '#1E1E1E' : '#A2A2A2'} />)
      }}/>
      <Tab.Screen name="FriendScreen" component={FriendScreen} options={{
        tabBarIcon: ({ focused }) => (<Ionicons name="people-outline" size={35} color={focused ? '#1E1E1E' : '#A2A2A2'} />)
      }} />
    </Tab.Navigator>
  );
};


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
        <Stack.Screen name="ChatScreen" component={ChatScreen}/>
        <Stack.Screen name="TabScreen" component={TabScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;