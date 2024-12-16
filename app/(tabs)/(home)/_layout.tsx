import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import TabOne from './TabOne';
import TabTwo from './TabTwo';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import BlurTabBarBackground from '@/components/ui/TabBarBackground.ios';

const TopTabs = createMaterialTopTabNavigator();

const HomeTopTabs = () => {
    return (
        <TopTabs.Navigator screenOptions={{
            tabBarStyle: Platform.select({
                ios: {
                    // Use a transparent background on iOS to show the blur effect                    
                    borderTopWidth: 0,
                    backgroundColor: TabBarBackground
                },
                default: {},
            }),
        }}>
            <TopTabs.Screen name="TabOne" component={TabOne} />
            <TopTabs.Screen name="TabTwo" component={TabTwo} />
        </TopTabs.Navigator>
    );
}

export default HomeTopTabs;