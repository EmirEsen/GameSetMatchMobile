import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabOne from './TabOne';
import TabTwo from './TabTwo';
import { Text } from 'react-native';

const TopTabs = createMaterialTopTabNavigator();

const tabBarIndicatorStyle = {
    backgroundColor: 'blue',
    height: 4,
    borderRadius: 20,
    marginVertical: 0.1,
};

const HomeTopTabs = () => {
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
                            fontSize: 14,
                        }}
                    >
                        {route.name}
                    </Text>
                ),
            })}>
            <TopTabs.Screen name="TabOne" component={TabOne} />
            <TopTabs.Screen name="TabTwo" component={TabTwo} />
        </TopTabs.Navigator>
    );
}

export default HomeTopTabs;