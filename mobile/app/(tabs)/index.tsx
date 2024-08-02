import { Image, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/New/welcome_bg.webp')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.containerrr}>
      <ThemedView style={styles.containerr}>
      </ThemedView>

      <ThemedView style={styles.container}>
        <Image
            source={require('@/assets/images/New/disney-plus-logo.webp')}
            style={styles.logo}
        />
        <ThemedText style={{marginBottom: 10, fontSize: 20}}> + More then you'd ever imagine </ThemedText>
        <ThemedView>
          <ThemedText style={styles.text}> We will use your information as detailed in the Subscriber Agreement, Privacy Policy, Cookie Policy, including to personalise your experience and send service updates. By clicking “Get Code”, you agree to the terms of our Subscriber Agreement and you also acknowledge and agree that your personal data will be processed in accordance with applicable law outside of your country of residence including in countries that may provide a different level of data protection. This site is protected by reCAPTCHA and the Google </ThemedText>
        </ThemedView>

        <TouchableOpacity style={styles.button}>
          <ThemedText style={{textAlign: "center", fontWeight: "bold"}}> Continue </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    // backgroundColor: "red"
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    // position: 'absolute',
  },
  container: {
    backgroundColor: "blue",
    justifyContent: "center",
    height: "100%",
  },
  containerr: {
    backgroundColor: "red",
    height: 100,
  },
  containerrr: {
    backgroundColor: "green",
    flex: 1,
  },
  button: {
    backgroundColor: "#0a5ae5",
    borderRadius: 8,
    padding: 12,
    marginTop: 40
  },
  text: {
    fontSize: 12,
    lineHeight: 15,
    opacity: 0.5
  },
  logo: {
    width: 100,
    height: 54,
    marginBottom: 14
  }
});
