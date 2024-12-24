import { useLocalSearchParams } from 'expo-router';
import MatchInfo from '@/components/MatchInfo';
import { AppDispatch, useAppSelector } from '@/store';
import { useMatchActions } from '@/components/actions/useMatchActions';
import image from '../../../../assets/images/bwhardcourt.jpg';
import { ImageBackground, ScrollView, RefreshControl, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { getTournamentMatchList } from '@/store/feature/matchSlice';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

export default function Matchs() {
    const { id } = useLocalSearchParams();
    const dispatch = useDispatch<AppDispatch>();
    const tournamentPlayerList = useAppSelector(state => state.tournamentPlayer.tournamentPlayerList);
    const tournamentMatches = useAppSelector(state => state.match.matchList);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        dispatch(getTournamentMatchList({ tournamentId: id as string }));
    }, [id]);

    const { handleAutoRejectMatch } = useMatchActions();

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(getTournamentMatchList({ tournamentId: id as string })).finally(() => {
            setRefreshing(false);
        });
    };

    return (
        <ImageBackground source={image} resizeMode="cover" className="flex-1" >
            <LinearGradient className="flex-1" colors={["rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0.4)"]}>
                <FlatList
                    data={tournamentMatches}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        minHeight: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingBottom: 80,
                    }}
                    renderItem={({ item }) => (
                        <MatchInfo
                            match={item}
                            tournamentPlayerList={tournamentPlayerList}
                            handleAutoRejectMatch={handleAutoRejectMatch}
                        />
                    )}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            </LinearGradient>
        </ImageBackground >
    );
}




