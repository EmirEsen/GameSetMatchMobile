// components/MyTournaments.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, SafeAreaView, RefreshControl } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../../store/index'
import { getPlayerProfileList, fetchLoggedInPlayerProfile } from '../../../store/feature/playerSlice';
import { getMatchList } from '../../../store/feature/matchSlice';
import { getMyTournaments } from '../../../store/feature/tournamentSlice';
import { fetchSendConfirmationEmail } from '../../../store/feature/authSlice';
import { MaterialIcons } from '@expo/vector-icons';
import { IPlayerProfile } from '../../../models/IPlayerProfile';
import config from '@/store/feature/config';
import image from '../../../assets/images/claycourt.jpg';
import TournamentCard from '../../../components/TournamentCard';
import { router } from 'expo-router';
import AddNewTournamentModal from '@/components/AddNewTournamentModal';
import { Swipeable, RectButton } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const TournamentList = () => {
  const { myTournaments, isLoading: isTournamentLoading } = useAppSelector(state => state.tournament);
  const { loggedInProfile } = useAppSelector(state => state.player);
  const dispatch = useDispatch<AppDispatch>();

  const [tournamentPlayers, setTournamentPlayers] = useState<{ [key: string]: IPlayerProfile[] }>({});
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getPlayerProfileList());
    dispatch(getMatchList());
    dispatch(getMyTournaments());
    dispatch(fetchLoggedInPlayerProfile());
  }, [dispatch]);

  useEffect(() => {
    if (loggedInProfile?.isEmailVerified) {
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
    return isEmailVerified;
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    refreshTournamentList();
  };

  const handleTournamentPress = (tournamentId: string) => {
    const id = tournamentId;
    const path = `/(tabs)/(tournaments)/${id}`;
    console.log(`Navigating to: ${path}`);
    router.push(path as any);
  };

  const refreshTournamentList = async () => {
    await dispatch(getMyTournaments());
  };

  const onRefresh = () => {
    setRefreshing(true);
    refreshTournamentList(); // Refresh the tournament list
    setRefreshing(false);
  };

  return (
    <ImageBackground source={image} resizeMode="cover" className="flex-1" >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          className="p-4"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {!isEmailVerified && (
            <View className="p-4 bg-yellow-100 rounded-md mb-4">
              <Text className="text-yellow-800">Your email is not verified. Please verify to use all features.</Text>
              <TouchableOpacity onPress={reSendConfirmationEmail} className="mt-2">
                <Text className="text-blue-500">Resend Confirmation Email</Text>
              </TouchableOpacity>
            </View>
          )}
          {myTournaments.length === 0 ? (
            <View className="mt-10">
              <Text className="text-zinc-300 text-lg">
                You currently have no tournaments.
                <Text className="font-bold"> You can start a new tournament or join one!</Text>
              </Text>
            </View>
          ) : (
            <View className="my-0 pb-20">
              {myTournaments.map(tournament => (
                <TouchableOpacity key={tournament.id} onPress={() => handleTournamentPress(tournament.id)}>
                  <TournamentCard tournament={tournament} tournamentPlayers={tournamentPlayers[tournament.id] || []} />
                </TouchableOpacity>
              ))}
            </View>
          )}

        </ScrollView>
      </SafeAreaView>

      <View className="absolute" style={{ bottom: 100, right: 20 }}>
        <TouchableOpacity
          onPress={toggleModal}
          disabled={!isFeaturesAvailable()}
          className={`w-14 h-14 rounded-full flex items-center justify-center ${isFeaturesAvailable() ? 'bg-blue-500' : 'bg-zinc-400'}`}
          style={{ opacity: isFeaturesAvailable() ? 1 : 0.6 }}
        >
          <MaterialIcons name="add" size={32} color="black" />
        </TouchableOpacity>
      </View>

      {/* Add New Tournament Modal */}
      <AddNewTournamentModal
        visible={isModalVisible}
        onClose={toggleModal}
        onSubmit={async (formData) => {
          console.log('New Tournament Data:', formData);
          // Perform any actions to save the new tournament (e.g., dispatch an action)
          await dispatch(getMyTournaments());
          // Close the modal and refresh the tournament list
          toggleModal();
        }}
      />
    </ImageBackground>
  );
};

export default TournamentList;