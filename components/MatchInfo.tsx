import { IGetMatch } from "@/models/get/IGetMatch";
import { IGetTournamentPlayer } from "@/models/get/IGetTournamentPlayer";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MatchStatus } from "@/models/enums/MatchStatus";

interface MatchInfoProps {
    match: IGetMatch;
    tournamentPlayerList?: IGetTournamentPlayer[];
    actionButtons?: React.ReactNode;
    handleAutoRejectMatch: (matchId: string, tournamentId: string) => void;
}

const excludeSeconds = (time: string): string => time.split(':').slice(0, 2).join(':');

const formatTimeRemaining = (endTime: Date) => {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();

    if (diff <= 0) return '0:00';

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const formatMatchDate = (date: string): string => dayjs(date).format('DD MMM YYYY');

const getRatingChangeDisplay = (ratingChange: number) => {
    const iconSize = 12;
    const icon = ratingChange > 0 ?
        <AntDesign name="caretup" size={iconSize} color="green" />
        : ratingChange < 0 ? <AntDesign name="caretdown" size={iconSize} color="red" /> : <AntDesign name="caretright" size={iconSize} color="gray" />
    return (
        <View style={styles.ratingChange}>
            {icon}
            <Text style={[styles.ratingText, { color: ratingChange > 0 ? 'green' : ratingChange < 0 ? 'red' : 'gray' }]}>
                {Math.abs(ratingChange)}
            </Text>
        </View>
    );
};

export default function MatchInfo({
    match,
    tournamentPlayerList,
    actionButtons,
    handleAutoRejectMatch,
}: MatchInfoProps) {
    const { status, court, date, time, score, player1Id, player2Id, winnerId, createdAt } = match;
    const [timeRemaining, setTimeRemaining] = useState<string>('');

    const player1 = tournamentPlayerList?.find((p) => p.playerId === player1Id);
    const player2 = tournamentPlayerList?.find((p) => p.playerId === player2Id);

    useEffect(() => {
        if (status === MatchStatus.PENDING && createdAt) {
            const endTime = new Date(new Date(createdAt).getTime() + 15 * 60000);
            const timer = setInterval(() => {
                const remaining = formatTimeRemaining(endTime);
                setTimeRemaining(remaining);

                if (remaining === '0:00') {
                    clearInterval(timer);
                    handleAutoRejectMatch(match.id, match.tournamentId);
                }
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [match]);

    if (!player1 || !player2) return <Text style={styles.notFound}>Players not found</Text>;

    const isDraw = winnerId === 'draw';
    const winner = isDraw ? null : winnerId === player1.playerId ? player1 : player2;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.court}>
                    {court}
                </Text>
                <View style={styles.dateTimeContainer}>
                    <Text style={styles.dateTime}>
                        {date ? formatMatchDate(date) : 'No date'}
                    </Text>
                    <Text style={styles.time}>
                        {time ? excludeSeconds(time) : '-'}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.playerRow}>
                {status === MatchStatus.APPROVED && getRatingChangeDisplay(match.player1RatingChange)}
                <Text style={styles.playerName}>
                    {`${player1.firstname[0]}. ${player1.lastname}`}
                    {!isDraw && winner === player1 && <Entypo name="check" size={18} color="green" />}
                </Text>
                <Text style={styles.score}>{score.map((set) => set.player1Score).join('  ') || 'N/A'}</Text>
            </View>

            <View style={styles.playerRow}>
                {status === MatchStatus.APPROVED && getRatingChangeDisplay(match.player2RatingChange)}
                <Text style={styles.playerName}>
                    {`${player2.firstname[0]}. ${player2.lastname}`}
                    {!isDraw && winner === player2 && <Entypo name="check" size={18} color="green" />}
                </Text>
                <Text style={styles.score}>{score.map((set) => set.player2Score).join('  ') || 'N/A'}</Text>
            </View>

            {status === MatchStatus.PENDING && (
                <View style={styles.pendingContainer}>
                    <Text style={styles.pendingText}>
                        Match under review by {player2.firstname}
                    </Text>
                    <View style={styles.timeContainer}>
                        <MaterialIcons name="access-time" size={14} color="#ffa726" />
                        <Text style={styles.pendingText}>{timeRemaining}</Text>
                    </View>
                </View>
            )}

            <View style={styles.divider} />

            <Text style={styles.result}>
                {isDraw ? 'The match ended in a draw.' : `Game, Set and Match ${winner?.firstname} ${winner?.lastname}.`}
            </Text>
            {!isDraw && (
                <Text style={styles.result}>
                    {`${winner?.firstname[0]}. ${winner?.lastname} wins `}
                    {score.map((set, index) => {
                        const winnerScore = winnerId === player1Id ? set.player1Score : set.player2Score;
                        const loserScore = winnerId === player1Id ? set.player2Score : set.player1Score;
                        return (
                            <Text key={index}>
                                {winnerScore}-{loserScore}
                                {index < score.length - 1 ? ' ' : ''}
                            </Text>
                        );
                    })}
                </Text>
            )}

            {actionButtons && <View style={styles.actionButtons}>{actionButtons}</View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginVertical: 8,
        padding: 16,
        elevation: 2,
        minWidth: '90%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    court: {
        fontSize: 14,
        fontWeight: 'bold',
        flex: 1,
    },
    dateTimeContainer: {
        alignItems: 'flex-end',
    },
    dateTime: {
        fontSize: 12,
        color: 'gray',
    },
    time: {
        fontSize: 12,
        color: 'gray',
    },
    playerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    playerName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'blue',
        flex: 1,
    },
    score: {
        fontSize: 14,
        fontWeight: '400',
        color: '#333',
    },
    ratingChange: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
    },
    ratingText: {
        fontSize: 12,
        marginLeft: 4,
        fontWeight: 'bold',
    },
    pendingText: {
        color: '#ffa726',
        fontSize: 12,
        marginTop: 8,
        marginBottom: 8,
    },
    result: {
        fontSize: 12,
        color: 'gray',
        marginTop: 3,
    },
    actionButtons: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    notFound: {
        textAlign: 'center',
        color: 'red',
        fontSize: 14,
    },
    divider: {
        height: 0.4,
        width: 'auto',
        marginHorizontal: 4,
        backgroundColor: 'lightgray',
    },
    pendingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
});