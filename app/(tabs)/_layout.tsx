import { router, Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#081223',
                },
                headerTintColor: 'white',
                tabBarButton: HapticTab,
                tabBarStyle: Platform.select({
                    ios: {
                        borderTopWidth: 0,
                        backgroundColor: '#081223',
                        position: 'absolute',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
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
                    headerRight: () => (
                        <TouchableOpacity onPress={() => router.push('/Notifications')}>
                            <View className="p-4">
                                <IconSymbol name="bell" size={20} color="white" />
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
            <Tabs.Screen
                name="(tournaments)"
                options={{
                    title: 'My Tournaments',
                    tabBarIcon: ({ focused, color }) =>
                        <IconSymbol size={28} name={focused ? 'trophy.fill' : 'trophy'} color={color} />,
                }}
            />
            <Tabs.Screen
                name="(profile)"
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
