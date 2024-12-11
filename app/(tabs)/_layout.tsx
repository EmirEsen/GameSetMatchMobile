import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import home from './home';

export default function TabLayout() {

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                        borderTopWidth: 0
                    },
                    default: {},
                }),
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused, color }) => <IconSymbol size={28} name={focused ? 'house.fill' : 'house'} color={color} />,
                }}
            />
            <Tabs.Screen
                name="my-tournaments"
                options={{
                    title: 'Tournaments',
                    tabBarIcon: ({ focused, color }) => <IconSymbol size={28} name={focused ? 'trophy.fill' : 'trophy'} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused, color }) => <IconSymbol size={28} name={focused ? 'person.fill' : 'person'} color={color} />,
                }}
            />
        </Tabs>
    );
}
