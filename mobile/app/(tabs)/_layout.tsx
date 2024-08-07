import { Stack } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TailwindProvider } from 'tailwindcss-react-native';
import { Platform } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <TailwindProvider platform={Platform.OS}>
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="index"
      />
      <Stack.Screen
        name="Auth/Login"
      />
      <Stack.Screen
        name="Auth/Perofiles"
      />
    </Stack>
    </TailwindProvider>
  );
}
