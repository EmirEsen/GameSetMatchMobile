import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Matchs from './Matchs';
import Ranklist from './Ranklist';
import { ParamListBase } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const TopTabs = createMaterialTopTabNavigator();

const tabBarIndicatorStyle = {
    backgroundColor: 'blue',
    height: 3,
    borderRadius: 20,
    marginVertical: 1,
    width: '50%' as any,
};

export default function TournamentTopTabs() {
    return (
        <TopTabs.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: '#081223',
            },
            tabBarIndicatorStyle: tabBarIndicatorStyle,
            tabBarLabelStyle: {
                color: 'white',
                fontWeight: 'bold',
            },
            tabBarActiveTintColor: 'blue',
        }}>
            <TopTabs.Screen name="Ranklist" component={Ranklist} />
            <TopTabs.Screen name="Matches" component={Matchs} />
        </TopTabs.Navigator>
    );
} 