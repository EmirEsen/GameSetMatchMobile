import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StatusDot from './ui/StatusDot'; // Update the import path
import { ITournament } from '../models/ITournament';
import { IPlayerProfile } from '../models/IPlayerProfile';
import { TournamentPrivacy } from '../models/enums/TournamentPrivacy'
import AvatarGroup from './ui/AvatarGroup';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';

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

const TournamentCard: React.FC<TournamentProps> = ({ tournament, tournamentPlayers }) => {
    const formattedDates = formatTournamentDate(tournament.start, tournament.end, tournament.isDurationFinite);

    return (
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
                    <AvatarGroup avatars={tournamentPlayers.map(player => ({ avatarUrl: player.profileImageUrl, initials: player.firstname[0] + player.lastname[0] }))} max={4} />
                </View>
            </View>
        </View>
    );
};

export default TournamentCard;
