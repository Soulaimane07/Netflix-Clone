import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Browse() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const storedProfile = await AsyncStorage.getItem('Disney-profile');
                if (storedProfile) {
                    setProfile(JSON.parse(storedProfile));
                }
            } catch (error) {
                console.error("Failed to retrieve profile", error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <View>
            {profile ? (
                <Text>Welcome, {profile.name}!</Text>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
}
