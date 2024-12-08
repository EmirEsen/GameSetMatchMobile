// components/MyTournaments.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/index'
import { getPlayerProfileList, fetchPlayerProfile } from '../../store/feature/playerSlice';
import { getMatchList } from '../../store/feature/matchSlice';
import { getMyTournaments } from '../../store/feature/tournamentSlice';
import { fetchSendConfirmationEmail } from '../../store/feature/authSlice';
import Tournament from '../../components/Tournament';
import { MaterialIcons } from '@expo/vector-icons';
import { IPlayerProfile } from '../../models/IPlayerProfile';
import config from '@/store/feature/config';

const MyTournaments = () => {
  const { myTournaments, isLoading: isTournamentLoading } = useSelector((state: RootState) => state.tournament);
  const { loggedInProfile } = useSelector((state: RootState) => state.player);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const dispatch = useDispatch<AppDispatch>();

  const [tournamentPlayers, setTournamentPlayers] = useState<{ [key: string]: IPlayerProfile[] }>({});
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    dispatch(getPlayerProfileList());
    dispatch(getMatchList());
    dispatch(getMyTournaments());
    if (isAuth) {
      dispatch(fetchPlayerProfile());
    }
  }, [isAuth]);

  useEffect(() => {
    if (loggedInProfile) {
      setIsEmailVerified(loggedInProfile.isEmailVerified);
    }
  }, [loggedInProfile]);

  useEffect(() => {
    const fetchTournamentPlayers = async (tournamentId: string) => {
      try {
        const response = await fetch(`${config.BASE_URL}/api/v1/tournament-player/${tournamentId}/players`);
        const players: IPlayerProfile[] = await response.json();
        setTournamentPlayers(prevPlayers => ({
          ...prevPlayers,
          [tournamentId]: players,
        }));
      } catch (error) {
        console.error('Failed to fetch tournament players:', error);
      }
    };

    myTournaments.forEach(tournament => {
      if (!tournamentPlayers[tournament.id]) {
        fetchTournamentPlayers(tournament.id);
      }
    });
  }, [myTournaments]);

  const reSendConfirmationEmail = () => {
    dispatch(fetchSendConfirmationEmail(loggedInProfile?.email || ''));
  };

  const isFeaturesAvailable = () => {
    return isAuth && isEmailVerified;
  };

  const getInfoText = () => {
    if (!isAuth) {
      return 'Sign In To Start New Tournament';
    }
    if (isAuth && !isEmailVerified) {
      return 'Verify Email To Start New Tournament';
    }
    return 'Add New Tournament';
  };

  const refreshTournamentList = () => {
    dispatch(getMyTournaments());
  };

  if (isTournamentLoading) {
    return <ActivityIndicator size="large" className="mt-20" />;
  }

  return (
    <ScrollView className="p-4">
      {isAuth && !isEmailVerified && (
        <View className="p-4 bg-yellow-100 rounded-md mb-4">
          <Text className="text-yellow-800">Your email is not verified. Please verify to use all features.</Text>
          <TouchableOpacity onPress={reSendConfirmationEmail} className="mt-2">
            <Text className="text-blue-500">Resend Confirmation Email</Text>
          </TouchableOpacity>
        </View>
      )}

      {myTournaments.length === 0 ? (
        <View className="mt-10">
          <Text className="text-gray-500 text-lg">
            You currently have no tournaments.
            <Text className="font-bold"> You can start a new tournament or join one!</Text>
          </Text>
        </View>
      ) : (
        myTournaments.map(tournament => (
          <Tournament key={tournament.id} tournament={tournament} tournamentPlayers={tournamentPlayers[tournament.id] || []} />
        ))
      )}

      {/* Floating Add Button for Mobile */}
      <View className="absolute bottom-4 right-4">
        <TouchableOpacity
          onPress={() => { }}
          disabled={!isFeaturesAvailable()}
          className={`w-14 h-14 rounded-full flex items-center justify-center ${isFeaturesAvailable() ? 'bg-blue-500' : 'bg-gray-400'}`}
        >
          <MaterialIcons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MyTournaments;
