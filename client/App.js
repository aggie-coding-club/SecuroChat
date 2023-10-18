import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignupScreen from './src/screens/SignupScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import PhoneVerificationScreen from './src/screens/PhoneVerificationScreen';


const App = () => {
  return (
    <PhoneVerificationScreen></PhoneVerificationScreen>
  );
}

export default App;