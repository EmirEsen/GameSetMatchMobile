import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StatusDot from '../components/ui/StatusDot'; // Update the import path
import { ITournament } from '../models/ITournament';
import { IPlayerProfile } from '../models/IPlayerProfile';
import { TournamentPrivacy } from '../models/enums/TournamentPrivacy'
import { MaterialIcons } from '@expo/vector-icons';
import AvatarGroup from './ui/AvatarGroup';
import pp from '../assets/images/sampleimage.jpg';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { router } from 'expo-router';

function formatTournamentDate(start: string | null, end: string | null, isDurationFinite: boolean): React.ReactNode {
    if (!isDurationFinite) {
        return (
            <View className="flex-row items-center">
                <Ionicons name="infinite-outline" size={18} color="gray" />
            </View>
        );
    }
    if (!start || !end) {
        return "Unknown dates";
    }
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedStart = new Date(start).toLocaleDateString('en-GB', options);
    const formattedEnd = new Date(end).toLocaleDateString('en-GB', options);
    return `${formattedStart} - ${formattedEnd}`;
}

interface TournamentProps {
    tournament: ITournament;
    tournamentPlayers: IPlayerProfile[];
}

const Tournament: React.FC<TournamentProps> = ({ tournament, tournamentPlayers }) => {
    const navigation = useNavigation();
    const formattedDates = formatTournamentDate(tournament.start, tournament.end, tournament.isDurationFinite);

    const handleTournamentPress = (tournamentId: string) => {
        router.push(`/tournaments`);
    };

    return (

        <TouchableOpacity onPress={() => handleTournamentPress(tournament.id)}>
            <View className="bg-neutral-300 border border-gray-200 rounded-2xl p-2 mb-4 shadow-sm"
                style={{ backgroundColor: 'rgba(243, 244, 246, 0.8)' }}>
                <View className="flex-row justify-between items-start">
                    <StatusDot status={tournament.status} />
                </View>

                <View className="flex-row items-start space-x-4">
                    <View className="flex-1">
                        <View className="flex-row items-center">
                            {tournament.privacy === TournamentPrivacy.PRIVATE && (
                                <EvilIcons name="lock" size={22} color="black" style={{ marginRight: 1 }} />
                            )}
                            <Text className="text-lg font-semibold text-black" style={{ maxWidth: '80%' }}>
                                {tournament.title}
                            </Text>
                        </View>
                        <View className="flex-row items-center">
                            <Text className="text-sm text-gray-500">Duration: </Text>
                            <Text className="text-sm text-gray-500">{formattedDates}</Text>
                        </View>
                        <Text className="text-sm text-gray-500 mt-2">
                            {tournament.info}
                        </Text>
                    </View>
                </View>

                <View className="flex-row justify-between items-center mt-4">
                    <View className="mx-5">
                        <AvatarGroup avatars={['pp', 'pp', 'pp']} max={4} />
                    </View>
                    {/* <TouchableOpacity
                        onPress={handleResultsClick}
                        className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md"
                    >
                        <Text className="text-blue-500 text-sm font-semibold">Results</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </TouchableOpacity >

    );
};

export default Tournament;
