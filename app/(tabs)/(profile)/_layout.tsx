import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import profile from './profile';
import { HapticTab } from '@/components/HapticTab';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import Subscription from './subscription';

export const TopTabs = createMaterialTopTabNavigator();

export default function ProfileTopTabs() {
    return (
        <TopTabs.Navigator>
            <TopTabs.Screen name="profile" component={profile} />
            <TopTabs.Screen name="subscription" component={Subscription} />
        </TopTabs.Navigator>
    );
}