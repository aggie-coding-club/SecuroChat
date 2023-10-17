import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, StatusBar, Button } from 'react-native';

const SignupScreen = () => {
    const {container} = styles;
    return (
      <SafeAreaView style={container}>
        <Image
            source={require('../../assets/blue-securochat-icon.png')}
        />
        <Text>
            SecuroChat
        </Text>
        <Text>
            Secure, Private, and Reliable Messaging
        </Text>
        <Button
            title="Continue with Google"
        />
        <Button
            title="Create an Account"
        />
        <Text>
            By signing up, you agree to our Terms of Service and Privacy Policy, including Cookie Use.
        </Text>
        <Text>
            Already have an account? Log in
        </Text>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default SignupScreen;