import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/New/welcome_bg.webp')}
            style={styles.reactLogo}
          />
        }>
          <View style={styles.content}>
            <Image
              source={require('@/assets/images/New/disney-plus-logo.webp')}
              style={styles.logo}
            />
            <ThemedText style={styles.title}>
              + More than you'd ever imagine
            </ThemedText>
            <ThemedText style={styles.text}>
              We will use your information as detailed in Subscriber Agreement, Privacy Policy, Cookie Policy, and EMEA Privacy Rights, including to personalise your experience and send service updates. By clicking “Continue”, you agree to the terms of our Subscriber Agreement and you also acknowledge and agree that your personal data will be processed in accordance with applicable law outside of your country of residence including in countries that may provide a different level of data protection. For the subscription price applicable in your country of residence, please see the FAQ.
            </ThemedText>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Auth/Login')}>
              <ThemedText style={styles.buttonText}>Continue</ThemedText>
            </TouchableOpacity>
          </View>
      </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  content: {
    height: '100%',
  },
  logo: {
    width: 100,
    height: 54,
    marginBottom: 20,
  },
  title: {
    marginBottom: 14,
    fontSize: 20,
    color: 'white',
  },
  text: {
    fontSize: 13,
    lineHeight: 15,
    color: 'white',
    opacity: 0.5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0a5ae5',
    borderRadius: 8,
    padding: 12,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});
