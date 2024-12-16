import { useLocalSearchParams } from 'expo-router';
import MatchInfo from '@/components/MatchInfo';
import { AppDispatch, useAppSelector } from '@/store';
import { useMatchActions } from '@/components/actions/useMatchActions';
import image from '../../../../assets/images/bwhardcourt.jpg';
import { ImageBackground, ScrollView } from 'react-native';
import { useEffect } from 'react';
import { getMatchList, getTournamentMatchList } from '@/store/feature/matchSlice';
import { useDispatch } from 'react-redux';

export default function Matchs() {
    const { id } = useLocalSearchParams();
    const dispatch = useDispatch<AppDispatch>();
    const tournamentPlayerList = useAppSelector(state => state.tournamentPlayer.tournamentPlayerList);
    const tournamentMatches = useAppSelector(state => state.match.matchList);

    useEffect(() => {
        dispatch(getTournamentMatchList({ tournamentId: id as string }));
    }, [id]);

    const { handleAutoRejectMatch } = useMatchActions();


    return (
        <ImageBackground source={image} resizeMode="cover" className="flex-1" >
            <ScrollView className="p-7" contentContainerStyle={{ alignItems: 'center' }}>
                {tournamentMatches.map((matchItem) => (
                    <MatchInfo key={matchItem.id}
                        match={matchItem}
                        tournamentPlayerList={tournamentPlayerList}
                        handleAutoRejectMatch={handleAutoRejectMatch} />
                ))}
            </ScrollView>
        </ImageBackground>
    );
}




