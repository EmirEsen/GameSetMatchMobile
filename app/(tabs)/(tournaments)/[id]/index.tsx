import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Matchs from './Matchs';
import Ranklist from './Ranklist';
import { ParamListBase } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AddNewMatchModal from '@/components/AddNewMatchModal';

const TopTabs = createMaterialTopTabNavigator();

const tabBarIndicatorStyle = {
    backgroundColor: 'blue',
    height: 4,
    borderRadius: 20,
    marginVertical: 0.1,
};

export default function TournamentTopTabs() {
    return (
        <>
            <StatusBar style="light" />
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
                <TopTabs.Screen name="Ranklist" component={Ranklist} />
                <TopTabs.Screen name="Matches" component={Matchs} />
            </TopTabs.Navigator>
        </>
    );
} 