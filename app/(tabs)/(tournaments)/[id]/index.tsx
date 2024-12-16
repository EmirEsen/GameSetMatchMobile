
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Matchs from './Matchs';
import Ranklist from './Ranklist';
import { ParamListBase } from '@react-navigation/native';

const TopTabs = createMaterialTopTabNavigator();

export default function TournamentTopTabs() {
    return (
        <TopTabs.Navigator initialRouteName="Ranklist">
            <TopTabs.Screen name="Ranklist" component={Ranklist} />
            <TopTabs.Screen name="Matches" component={Matchs} />
        </TopTabs.Navigator>
    );
} 4