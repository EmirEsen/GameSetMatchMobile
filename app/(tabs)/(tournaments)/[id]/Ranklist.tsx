import { View, Text, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/store';
import { getPlayersOfTournament } from '@/store/feature/tournamentPlayerSlice';
import { getMyTournaments, getTournamentById } from '@/store/feature/tournamentSlice';
import { ITournament } from '@/models/ITournament';
import RankList from '@/components/Ranklist';
import { MaterialIcons } from '@expo/vector-icons';
import AddNewMatchModal from '@/components/AddNewMatchModal';

export default function RanklistPage() {
    const { id } = useLocalSearchParams();
    const tournamentId = id;
    const dispatch = useDispatch<AppDispatch>();
    const tournamentPlayerList = useAppSelector(state => state.tournamentPlayer.tournamentPlayerList);
    const [tournament, setTournament] = useState<ITournament | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(prevState => !prevState);
    };

    // Fetch players on mount
    useEffect(() => {
        if (typeof tournamentId === 'string') {
            dispatch(getPlayersOfTournament(tournamentId));
            dispatch(getTournamentById(tournamentId)).then((res) => {
                setTournament(res.payload as ITournament);
            }).catch((error) => {
                console.error("Error fetching tournament data:", error);
            });
        }
    }, [dispatch, tournamentId]);

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(getPlayersOfTournament(tournamentId as string))
            .catch((error) => {
                console.error("Error refreshing players:", error);
            })
            .finally(() => {
                setRefreshing(false);
            });
    };

    if (!tournament) {
        return <Text>Loading...</Text>; // Show a loading message or spinner
    }

    return (
        <>
            <RankList
                players={tournamentPlayerList}
                tournamentId={tournamentId as string}
                tournament={tournament}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
            <View className="absolute" style={{ bottom: 100, right: 20 }}>
                <TouchableOpacity
                    onPress={toggleModal} // Open the modal when pressed
                    disabled={false}
                    className="w-14 h-14 rounded-full flex items-center justify-center bg-blue-500"
                >
                    <MaterialIcons name="add" size={32} color="black" />
                </TouchableOpacity>
            </View>

            <AddNewMatchModal
                tournamentId={tournamentId as string}
                tournamentPlayerList={tournamentPlayerList}
                visible={isModalVisible}
                onClose={toggleModal}
            />
        </>
    );
}
