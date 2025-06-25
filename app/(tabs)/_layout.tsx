import React from 'react';
import {  Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: `#fff`,
        headerShown: false,
        tabBarStyle: { backgroundColor: '#244D60' }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: 'Sair',
          tabBarIcon: ({ color }) => <Ionicons name="log-out-outline" size={24} color={color} />
        }}
      />
    </Tabs>
  );
}
