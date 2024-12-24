import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import profile from './profile';
import { HapticTab } from '@/components/HapticTab';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import Subscription from './subscription';
import { Text } from 'react-native';

export const TopTabs = createMaterialTopTabNavigator();
const tabBarIndicatorStyle = {
    backgroundColor: 'blue',
    height: 4,
    borderRadius: 20,
    marginVertical: 0.1,
};

export default function ProfileTopTabs() {
    return (
        <TopTabs.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: '#081223',
                    borderTopWidth: 0,
                    height: 40,
                },
                tabBarIndicatorStyle: tabBarIndicatorStyle,
                tabBarLabel: ({ focused }) => (
                    <Text
                        style={{
                            color: focused ? 'blue' : 'white',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        {route.name}
                    </Text>
                ),
            })}
        >
            <TopTabs.Screen name="profile" component={profile} />
            <TopTabs.Screen name="subscription" component={Subscription} />
        </TopTabs.Navigator>
    );
}