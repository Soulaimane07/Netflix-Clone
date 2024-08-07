import React from 'react';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profiles() {
    const navigation = useNavigation()
    const route = useRoute();

    const { profiles } = route.params || {};

    const renderProfile = ({ item }) => (
        <TouchableOpacity style={styles.profile} onPress={()=> ProfileFun(item)}>
            <Image source={{ uri: item.profile }} style={styles.profileImage} />
            <ThemedText style={styles.name}>{item.name}</ThemedText>
        </TouchableOpacity>
    );

    const ProfileFun = (profile) => {
        AsyncStorage.setItem('Disney-profile', JSON.stringify(profile))
        navigation.navigate("User/Browse")
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
                <Text style={styles.title}>Who's watching?</Text>
                {profiles && profiles.length > 0 ? (
                    <FlatList
                        data={profiles}
                        renderItem={renderProfile}
                        keyExtractor={(item) => item.id.toString()} // Ensure id is unique and converted to string
                        numColumns={2} // Adjust the number of columns as needed
                        contentContainerStyle={styles.profileList}
                    />
                ) : (
                    <Text style={styles.noProfilesText}>No profiles available</Text>
                )}
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
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    logo: {
        width: 100,
        height: 54,
        marginBottom: 20,
    },
    title: {
        marginBottom: 26,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    profileList: {
        alignItems: 'center',
    },
    profile: {
        margin: 10,
        marginBottom: 26,
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    name: {
        color: 'white',
        fontSize: 15,
        marginTop: 8,
        textAlign: 'center',
    },
    noProfilesText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});
