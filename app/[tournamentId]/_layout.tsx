import React from 'react';
import { Stack, Tabs } from 'expo-router';
import {
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions,
    createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { HapticTab } from '@/components/HapticTab';
import { Platform } from 'react-native';
import TabBarBackground from '@/components/ui/TabBarBackground';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export default function TournamentTopTabLayout() {
    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarPosition: "top",
                    tabBarButton: HapticTab,
                    tabBarBackground: TabBarBackground,
                    tabBarStyle: Platform.select({
                        ios: {
                            // Use a transparent background on iOS to show the blur effect
                            // position: 'absolute',                            
                            borderTopWidth: 0
                        },
                        default: {},
                    })
                }}
            >
                <Tabs.Screen
                    name="ranklist"
                    options={{ title: "Ranklist" }}
                />
                <Tabs.Screen
                    name="matches"
                    options={{ title: "Matches" }}
                />
            </Tabs>
        </>
    );
}