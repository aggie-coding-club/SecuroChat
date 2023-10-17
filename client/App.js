import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignupScreen from "./src/screens/SignupScreen";


const App = () => {
  return (
    <SignupScreen></SignupScreen>
  );
}

export default App;

/*
{
  return (
    <View style={styles.container}>
      <Text>Welcome to securochat!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/