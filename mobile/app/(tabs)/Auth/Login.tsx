import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BaseUrl } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const loginFun = () => {
        axios.post(`${BaseUrl}/users/login`, {email, pass})
            .then(res => {
                console.log(res.data);
                AsyncStorage.setItem('Disney-user', JSON.stringify(res.data))
                navigation.navigate("Auth/Perofiles", { profiles: res.data.profiles})
            })
            .catch(err => {
                console.error(err);
            })
    }

  return (
    <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
            <Image
                source={require('@/assets/images/New/welcome_bg.webp')}
                style={styles.reactLogo}
            />
        }
    >
        <View style={styles.content}>
            <Image
                source={require('@/assets/images/New/disney-plus-logo.webp')}
                style={styles.logo}
            />
            <Text style={styles.title}> Login your account </Text>

            <View>
                <Text style={styles.label}> Email Adress </Text>
                <TextInput placeholder='Email' onChangeText={(text) => setEmail(text)} style={styles.input} autoFocus />
                <Text style={styles.label}> Password </Text>
                <TextInput placeholder='Password' onChangeText={(text) => setPass(text)} style={styles.input} secureTextEntry={true} />
            </View>
            <TouchableOpacity style={styles.button} onPress={loginFun}>
                <ThemedText style={styles.buttonText}>Login</ThemedText>
            </TouchableOpacity>
        </View>
    </ParallaxScrollView>
  )
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
      marginBottom: 26,
      fontWeight: "bold",
      fontSize: 20,
      color: 'white',
    },
    label: {
        color: "white",
        fontSize: 15,
        marginBottom: 14
    },
    input: {
        borderWidth: 0.5,
        borderColor: "white",
        borderRadius: 8,
        color: "white",
        paddingHorizontal: 14,
        paddingVertical: 8,
        marginBottom: 18,
        fontSize: 14
    },
    button: {
      backgroundColor: '#0a5ae5',
      borderRadius: 8,
      padding: 12,
      marginTop: 30
    },
    buttonText: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'white',
    },
});
  