import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TournamentList from './(tournaments)/tournamentList';
import HomeTopTabs from './(home)/_layout';
import BlurTabBarBackground from '@/components/ui/TabBarBackground.ios';
import ProfileTopTabs from './(profile)/_layout';
import TournamentLayout from './(tournaments)/[id]/_layout';
import TournamentTopTabs from './(tournaments)/[id]';

// const Tab = createBottomTabNavigator();

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: TabBarBackground,
                },
                tabBarButton: HapticTab,
                tabBarBackground: BlurTabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        borderTopWidth: 0,
                        backgroundColor: TabBarBackground,
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
