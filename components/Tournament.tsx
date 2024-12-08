import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { Avatar, AvatarGroup } from 'nativewind';
import StatusDot from '../components/ui/StatusDot'; // Update the import path
import { ITournament } from '../models/ITournament';
import { IPlayerProfile } from '../models/IPlayerProfile';
import { TournamentPrivacy } from '../models/enums/TournamentPrivacy'
import { MaterialIcons } from '@expo/vector-icons';

function formatTournamentDate(start: string | null, end: string | null, isDurationFinite: boolean): React.ReactNode {
    if (!isDurationFinite) {
        // return <AllInclusive size={16} className="text-gray-500" />;
        return <>All</>
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

    const handleResultsClick = () => {
        // navigation.navigate('TournamentDetails', { tournamentId: tournament.id });
    };

    return (
        <View className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
            <View className="flex-row justify-between items-start mb-4">
                <StatusDot status={tournament.status} />
            </View>

            <View className="flex-row items-start space-x-4">
                <Image
                    source={{ uri: 'someimage' }} // Replace 'someimage' with the actual image URL
                    className="w-14 h-14 rounded-md"
                    resizeMode="cover"
                />
                <View className="flex-1">
                    <Text className="text-lg font-semibold text-black">
                        {tournament.title}
                        {tournament.privacy === TournamentPrivacy.PRIVATE && (
                            <MaterialIcons name='lock' />
                        )}
                    </Text>
                    <Text className="text-sm text-gray-500">
                        Duration: {formattedDates}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-2">
                        {tournament.info}
                    </Text>
                </View>
            </View>

            <View className="flex-row justify-between items-center mt-4">
                <View className="flex-row">
                    {/* <AvatarGroup max={6} className="space-x-2">
                        {tournamentPlayers.map((participant) => (
                            <Avatar
                                key={participant.id}
                                source={{ uri: participant.profileImageUrl }}
                                className="w-8 h-8 rounded-full"
                            />
                        ))}
                    </AvatarGroup> */}
                </View>
                <TouchableOpacity
                    onPress={handleResultsClick}
                    className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md"
                >
                    <Text className="text-blue-500 text-sm font-semibold">Results</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Tournament;
