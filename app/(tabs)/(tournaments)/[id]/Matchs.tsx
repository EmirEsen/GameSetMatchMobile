import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import MatchInfo from '@/components/MatchInfo';
import { useAppSelector } from '@/store';
import { useMatchActions } from '@/components/actions/useMatchActions';

export default function Matchs() {
    const { id } = useLocalSearchParams();
    const tournamentPlayerList = useAppSelector(state => state.tournamentPlayer.tournamentPlayerList);
    const tournamentMatches = useAppSelector(state => state.match.matchList);
    const match = useAppSelector(state => state.match.matchList);

    const { handleAutoRejectMatch } = useMatchActions();


    return (
        <>
            {tournamentMatches.map((matchItem) => (
                <MatchInfo key={matchItem.id}
                    match={matchItem}
                    tournamentPlayerList={tournamentPlayerList}
                    handleAutoRejectMatch={handleAutoRejectMatch} />
            ))}
        </>
    );
}


