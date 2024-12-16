import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/store';
import { approveMatch, rejectMatch, autoRejectMatch, getTournamentMatchList } from '@/store/feature/matchSlice';
import { getPlayersOfTournament } from '@/store/feature/tournamentPlayerSlice';
import { IGetTournamentPlayer } from '@/models/get/IGetTournamentPlayer';
import { IPlayerProfile } from '@/models/IPlayerProfile';
import { fetchPlayerNotifications } from '@/store/feature/notificationSlice';

export const useMatchActions = (onRefresh?: () => void) => {
    const dispatch = useDispatch<AppDispatch>();
    const loggedInPlayer: IPlayerProfile | null = useAppSelector(state => state.player.loggedInProfile);

    const refreshAllData = async (tournamentId: string) => {
        try {
            // Refresh all data concurrently
            await Promise.all([
                // Refresh tournament data (matches and rankings)
                dispatch(getTournamentMatchList({ tournamentId })),
                dispatch(getPlayersOfTournament(tournamentId)),
                // Refresh notifications if user is logged in
                loggedInPlayer?.id ? dispatch(fetchPlayerNotifications(loggedInPlayer.id)) : Promise.resolve(),
                // Call additional refresh if provided
                onRefresh ? Promise.resolve(onRefresh()) : Promise.resolve()
            ]);
        } catch (error) {
            console.error('Error refreshing data:', error);
        }
    };


    const handleAutoRejectMatch = async (matchId: string, tournamentId: string): Promise<void> => {
        try {
            const revokeResponse = await dispatch(autoRejectMatch({ tournamentId, matchId })).unwrap();
            if (revokeResponse.code === 200) {
                // Refresh all data
                await refreshAllData(tournamentId);


            } else {

            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return {
        handleAutoRejectMatch
    };
};