import { useLocalSearchParams } from 'expo-router';
import MatchInfo from '@/components/MatchInfo';
import { AppDispatch, useAppSelector } from '@/store';
import { useMatchActions } from '@/components/actions/useMatchActions';
import image from '../../../../assets/images/bwhardcourt.jpg';
import { ImageBackground, ScrollView, RefreshControl, FlatList, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getTournamentMatchList } from '@/store/feature/matchSlice';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import RejectMatchButton from '@/components/ui/RejectMatchButton';
import ApproveMatchButton from '@/components/ui/ApproveMatchButton';
import { MatchStatus } from '@/models/enums/MatchStatus';
import { IGetMatch } from '@/models/get/IGetMatch';
import { IPlayerProfile } from '@/models/IPlayerProfile';
import * as Burnt from "burnt";

export default function Matchs() {
    const { id } = useLocalSearchParams();
    const dispatch = useDispatch<AppDispatch>();
    const tournamentPlayerList = useAppSelector(state => state.tournamentPlayer.tournamentPlayerList);
    const tournamentMatches = useAppSelector(state => state.match.matchList);
    const loggedInPlayer: IPlayerProfile | null = useAppSelector(state => state.player.loggedInProfile);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        dispatch(getTournamentMatchList({ tournamentId: id as string }));
    }, [id]);

    const { handleApproveMatch, handleRejectMatch, handleAutoRejectMatch } = useMatchActions();

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(getTournamentMatchList({ tournamentId: id as string })).finally(() => {
            setRefreshing(false);
        });
    };

    const isReviewer = (match: IGetMatch) => {
        if (match.status !== MatchStatus.PENDING || !loggedInPlayer?.id) {
            return false;
        }

        return loggedInPlayer.id === match.player2Id;
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
                            actionButtons={
                                isReviewer(item) &&
                                <>
                                    <RejectMatchButton onReject={() => handleRejectMatch(item.id, id as string)} />
                                    <ApproveMatchButton onApprove={() => handleApproveMatch(item.id, id as string)} />
                                </>
                            }
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




