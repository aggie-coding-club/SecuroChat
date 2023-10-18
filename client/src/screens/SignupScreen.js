import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, StatusBar, Button } from 'react-native';
import GeneralButton from '../components/GeneralButton';

const SignupScreen = () => {
    const { rootContainer, pageHeader, mainTitle, subTitle, mainContainer, googleButton, googleButtonText, googleImage, buttonTextContainer, lineStyle, seperatorContainer, infoStyle, inlineLink, loginInfo } = styles;
    return (
      <SafeAreaView style={rootContainer}>
        <View style={pageHeader}>
          <Image
              source={require('../../assets/blue-securochat-icon.png')}
          />
          <Text style={mainTitle}>
              SecuroChat
          </Text>
          <Text style={subTitle}>
            Secure, Private, and Reliable Messaging
          </Text>
        </View>

        <View style={mainContainer}>
          <TouchableOpacity style={googleButton}>
            <View style={buttonTextContainer}>
              <Image
                source={require('../../assets/google-icon-logo.png')}
                style={googleImage}
              />
              <Text style={googleButtonText}>
                  Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
          <View style={seperatorContainer}>
            <View style={lineStyle}></View>
            <Text>Or</Text>
            <View style={lineStyle}></View>
          </View>
          <GeneralButton content='Create an Account'></GeneralButton>
          <Text style={infoStyle}>
              By signing up, you agree to our <Text style={inlineLink}>Terms of Service</Text> and <Text style={inlineLink}>Privacy Policy</Text>, including Cookie Use.
          </Text>
        </View>

        <View>
          <Text style={loginInfo}>
              Already have an account? <Text style={inlineLink}>Log in</Text>
          </Text>
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pageHeader: {
      flex: 3, 
      alignItems: 'center',
      rowGap: 3,
      paddingTop: 40
    },
    mainTitle: {
      color: '#0078D4',
      fontSize: 50,
      fontWeight: 'bold',
      paddingTop: 20
    },
    subTitle: {
      color: '#1E1E1E',
      fontSize: 18,
      fontWeight: 'bold',
    },
    mainContainer: {
      flex: 4,
      alignItems: 'center',
      rowGap: 10,
    },
    googleButton: {
      backgroundColor: '#FFFFFF',
      width: 300,
      padding: 5,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: '#C0C0C0'
    },
    googleButtonText: {
      color: '#1E1E1E',
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center'
    },
    buttonTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 8
    },
    googleImage: {
      width: 50,
      height: 50
    },
    seperatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 5,
      paddingHorizontal: 10,
    },
    lineStyle: {
      flex: 1,
      height: 1,
      borderBottomWidth: 1,
      borderBottomColor: '#C0C0C0',
      marginHorizontal: 10,
    },
    infoStyle: {
      marginTop: 10,
      fontSize: 15,
      width: 300,
      textAlign: 'center',
    },
    inlineLink: {
      color: '#0078D4',
    },
    loginInfo: {
      fontSize: 16,
      marginBottom: 20,
    }
  });

export default SignupScreen;