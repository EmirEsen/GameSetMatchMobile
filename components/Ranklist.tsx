import React from 'react';
import { FlatList, TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dayjs from 'dayjs';
import { IGetTournamentPlayer } from "@/models/get/IGetTournamentPlayer";
import { ITournament } from "@/models/ITournament";

type RankListProps = {
    players: IGetTournamentPlayer[];
    tournamentId: string;
    tournament: ITournament;
};

function calculateAge(dob: string): number {
    const birthDate = dayjs(dob);
    const currentDate = dayjs();
    return currentDate.diff(birthDate, 'year');
}

function calculateWinLossRatio(wins: number, losses: number): string {
    if (!wins && !losses) return '-';
    if (losses === 0) return '100%';
    const ratio = (wins / (wins + losses)) * 100;
    return `${ratio.toFixed(0)}%`;
}

export default function RankList({ players, tournamentId, tournament }: RankListProps) {
    // Renders the header row for the FlatList
    const renderHeader = () => (
        <View style={[styles.row, styles.headerRow]}>
            <Text style={styles.headerCell}>Rank</Text>
            <Text style={styles.headerCellPlayer}>Player</Text>
            <Text style={styles.headerCell} className='ml-20'>Rating</Text>
            <Text style={styles.headerCell}>Win/Loss</Text>
            <Text style={styles.headerCell}>Matches</Text>
            <Text style={styles.headerCell}>Wins</Text>
            <Text style={styles.headerCell}>Loses</Text>
        </View>
    );

    // Renders a player row
    const renderPlayer = ({ item, index }: { item: IGetTournamentPlayer; index: number }) => {
        const initials = `${item.firstname.charAt(0)}${item.lastname.charAt(0)}`.toUpperCase(); // Get initials
        return (
            <View style={styles.row}>
                <Text style={[styles.cell, styles.rank]}>{index + 1}</Text>
                <View style={[styles.cell, styles.playerInfo]}>
                    {item.profileImageUrl ? (
                        <Image source={{ uri: item.profileImageUrl }} style={styles.avatar} alt={item.firstname} />
                    ) : (
                        <View style={styles.initialsContainer}>
                            <Text style={styles.initials}>{initials}</Text>
                        </View>
                    )}
                    <TouchableOpacity onPress={() => console.log(`Navigating to Player ID: ${item.id}`)}>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.playerName}>
                            {item.firstname} {item.lastname}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.ratingCell}>{item.rating != null ? item.rating : '-'}</Text>
                <Text style={styles.cell}>{calculateWinLossRatio(item.win, item.lose)}</Text>
                <Text style={styles.cell}>{item.matchPlayed ?? '-'}</Text>
                <Text style={styles.cell}>{item.win ?? '-'}</Text>
                <Text style={styles.cell}>{item.lose ?? '-'}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{tournament.title}</Text>
                <Text style={styles.date}>
                    {tournament.isDurationFinite
                        ? `${dayjs(tournament.start).format('DD MMM YY')} - ${dayjs(tournament.end).format('DD MMM YY')}`
                        : tournament.status}
                </Text>
            </View>
            <FlatList
                data={players}
                renderItem={renderPlayer}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader} // Add a static header row
                ListEmptyComponent={<Text style={styles.empty}>No players available</Text>}
                stickyHeaderIndices={[0]} // Makes the header sticky
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        backgroundColor: '#081223',
        padding: 5,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    date: {
        fontSize: 14,
        color: '#ddd',
    },
    headerRow: {
        backgroundColor: '#e0e0e0',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    rank: {
        width: 25,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 12,
    },
    ratingCell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
        paddingLeft: 25,
    },
    headerCell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 9,
        fontWeight: 'bold',
    },
    headerCellPlayer: {
        flex: 1,
        textAlign: 'left',
        fontSize: 9,
        fontWeight: 'bold',
    },
    playerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 2,
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        marginRight: 10,
    },
    playerName: {
        fontSize: 14,
        fontWeight: '600',
        maxWidth: 70,
        flexWrap: 'wrap',
    },
    playerNameHeader: {
        flex: 2,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 8,
    },
    empty: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
    initialsContainer: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: '#ccc', // Background color for initials
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    initials: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
});
