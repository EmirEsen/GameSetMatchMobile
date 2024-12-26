import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/store';
import { approveMatch, rejectMatch, autoRejectMatch, getTournamentMatchList } from '@/store/feature/matchSlice';
import { getPlayersOfTournament } from '@/store/feature/tournamentPlayerSlice';
import { IGetTournamentPlayer } from '@/models/get/IGetTournamentPlayer';
import { IPlayerProfile } from '@/models/IPlayerProfile';
import { fetchPlayerNotifications } from '@/store/feature/notificationSlice';
import * as Burnt from "burnt";
import { IGetMatch } from '@/models/get/IGetMatch';

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
            Burnt.toast({
                title: 'Error',
                message: 'Failed to refresh data.',
                preset: 'error',
            });
        }
    };

    const handleMatchAddedToast = (updatedProfile: IGetTournamentPlayer) => {
        if (updatedProfile.matchPlayed < 3) {
            Burnt.toast({
                title: `Ratings revealed after`,
                message: `3 matches played!`,
                preset: "custom",
                duration: 3,
                layout: {

                    iconSize: {
                        height: 26,
                        width: 26,
                    },
                },
                icon: {
                    ios: {
                        name: "info.circle",
                        color: "#FFC300",
                    }
                }
            });
        }
    };

    const handleRatingToast = (updatedProfile: IGetTournamentPlayer) => {
        if (updatedProfile.matchPlayed < 3) {
            Burnt.toast({
                title: `Congrats, ${updatedProfile?.firstname}! 📣`,
                message: `After ${3 - updatedProfile.matchPlayed} more matches, your rating will be set!`,
                preset: "done",
                duration: 3,
            });
        } else if (updatedProfile.matchPlayed === 3) {
            Burnt.toast({
                title: `✨ Your rating is revealed!`,
                message: `${updatedProfile?.rating}`,
                preset: "custom",
                shouldDismissByDrag: true,
                duration: 3,
                layout: {
                    iconSize: {
                        height: 26,
                        width: 26,
                    },
                },
                icon: {
                    ios: {
                        name: "figure.dance",
                        color: "#FFC300",
                    }
                }
            });
        }
    };

    const handleApproveMatch = async (matchId: string, tournamentId: string): Promise<void> => {
        try {
            const approveResponse = await dispatch(approveMatch({ tournamentId, matchId })).unwrap();

            if (approveResponse.code === 200) {
                // Refresh all data
                await refreshAllData(tournamentId);

                // Check for rating updates
                const tournamentPlayers = await dispatch(getPlayersOfTournament(tournamentId)).unwrap();
                const updatedProfile = tournamentPlayers.find(player => player.playerId === loggedInPlayer?.id);

                Burnt.toast({
                    title: 'Match approved successfully!',
                    preset: "done",
                    duration: 1,
                });

                if (updatedProfile) {
                    handleRatingToast(updatedProfile);
                }
            } else {
                Burnt.toast({
                    title: 'Error',
                    message: approveResponse.message || 'Error approving match',
                    preset: "error"
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Burnt.toast({
                title: 'Error',
                message: 'Error handling approve match',
                preset: "error"
            });
        }
    };

    const handleRejectMatch = async (matchId: string, tournamentId: string): Promise<void> => {
        try {
            const revokeResponse = await dispatch(rejectMatch({ tournamentId, matchId })).unwrap();
            if (revokeResponse.code === 200) {
                // Refresh all data
                await refreshAllData(tournamentId);

                Burnt.toast({
                    title: 'Match Rejected!',
                    preset: "error"
                });
            } else {
                Burnt.toast({
                    title: 'Error',
                    message: revokeResponse.message || 'Error rejecting match',
                    preset: "error"
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Burnt.toast({
                title: 'Error',
                message: 'Error handling reject match',
                preset: "error"
            });
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
        handleApproveMatch,
        handleRejectMatch,
        handleAutoRejectMatch,
        handleMatchAddedToast
    };
};