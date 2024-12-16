import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: TabBarBackground,
                },
                tabBarButton: HapticTab,
                // tabBarBackground: BlurTabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        borderTopWidth: 0,
                        backgroundColor: '#081223',
                    },
                    default: {
                        backgroundColor: '#081223',
                    },
                }),
            }}>
            <Tabs.Screen
                name="(home)"
                options={{
                    title: 'Home',
                    headerShown: true,
                    tabBarIcon: ({ focused, color }) =>
                        <IconSymbol size={28} name={focused ? 'house.fill' : 'house'} color={color} />,
                }}
            />
            <Tabs.Screen
                name="(tournaments)"
                // component={TournamentList}                
                options={{
                    title: 'Tournaments',
                    tabBarIcon: ({ focused, color }) =>
                        <IconSymbol size={28} name={focused ? 'trophy.fill' : 'trophy'} color={color} />,
                }}
            />
            <Tabs.Screen
                name="(profile)"
                // component={ProfileTopTabs}
                options={{
                    title: 'Profile',
                    headerShown: true,
                    tabBarIcon: ({ focused, color }) =>
                        <IconSymbol size={28} name={focused ? 'person.fill' : 'person'} color={color} />,
                }}
            />
        </Tabs>
    );
}
