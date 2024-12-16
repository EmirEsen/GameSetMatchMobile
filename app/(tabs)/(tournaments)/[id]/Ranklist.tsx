import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { getPlayersOfTournament } from '@/store/feature/tournamentPlayerSlice';
import { getTournamentById } from '@/store/feature/tournamentSlice';
import { ITournament } from '@/models/ITournament';
import RankList from '@/components/Ranklist';

export default function RanklistPage() {
    const { id } = useLocalSearchParams();
    console.log('id', id);
    const tournamentId = id;
    console.log('tournamentId', tournamentId);
    const dispatch = useDispatch<AppDispatch>();
    const tournamentPlayerList = useAppSelector(state => state.tournamentPlayer.tournamentPlayerList);
    const [tournament, setTournament] = useState<ITournament | null>(null);

    // Fetch players on mount
    useEffect(() => {
        dispatch(getPlayersOfTournament(tournamentId as string))
        dispatch(getTournamentById(id as string)).then((res) => {
            setTournament(res.payload as ITournament);
        })
        console.log('tournamentPlayers', tournamentPlayerList);
    }, [dispatch, id]);

    if (!tournament) return null;

    return (
        <RankList
            players={tournamentPlayerList}
            tournamentId={id as string}
            tournament={tournament}
        />
    );
}

