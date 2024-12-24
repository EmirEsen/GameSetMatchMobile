import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { IGetMatch } from '../../models/get/IGetMatch';
import { IGetTournamentPlayer } from '../../models/get/IGetTournamentPlayer';
import { MatchStatus } from '../../models/enums/MatchStatus';
import { MaterialIcons } from '@expo/vector-icons';

function excludeSeconds(timeString: string): string {
  const parts = timeString.split(':');
  return parts.length >= 3 ? `${parts[0]}:${parts[1]}` : timeString;
}

const formatTimeRemaining = (endTime: Date) => {
  const now = new Date();
  const diff = endTime.getTime() - now.getTime();

  if (diff <= 0) return "0:00";

  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const formatMatchDate = (start: string): string => {
  return new Date(start).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const getRatingChangeDisplay = (ratingChange: number) => {
  if (ratingChange > 0) {
    return (
      <View className="flex-row items-center mr-2">
        <MaterialIcons name="arrow-upward" size={20} color="green" />
        <Text className="text-green-500">{ratingChange}</Text>
      </View>
    );
  } else if (ratingChange < 0) {
    return (
      <View className="flex-row items-center mr-2">
        <MaterialIcons name="arrow-downward" size={20} color="red" />
        <Text className="text-red-500">{Math.abs(ratingChange)}</Text>
      </View>
    );
  } else {
    return (
      <View className="flex-row items-center mr-2">
        <MaterialIcons name="arrow-forward" size={20} color="gray" />
        <Text className="text-gray-500">{Math.abs(ratingChange)}</Text>
      </View>
    );
  }
};

const MatchInfo = ({ match, tournamentPlayerList, actionButtons }: { match: IGetMatch; tournamentPlayerList?: IGetTournamentPlayer[]; actionButtons?: React.ReactNode }) => {
  const { status, court, date, time, score, player1Id, player2Id, winnerId } = match;
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  const player1 = tournamentPlayerList?.find(player => player.playerId === player1Id);
  const player2 = tournamentPlayerList?.find(player => player.playerId === player2Id);

  useEffect(() => {
    if (match.status === MatchStatus.PENDING && match.createdAt) {
      const endTime = new Date(new Date(match.createdAt).getTime() + 15 * 60000);

      const timer = setInterval(() => {
        const remaining = formatTimeRemaining(endTime);
        setTimeRemaining(remaining);

        if (remaining === "0:00") {
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [match]);

  if (!player1 || !player2) {
    return <Text>Players not found</Text>;
  }

  const isDraw = winnerId === 'draw';
  const winner = isDraw ? null : winnerId === player1.playerId ? player1 : player2;

  return (
    <View className="p-4 mb-4 rounded-2xl border border-gray-300 bg-gray-50">
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-bold">{court}</Text>
        <Text className="text-gray-500">
          {formatMatchDate(date)} | {time ? excludeSeconds(time) : ''}
        </Text>
      </View>

      <View className="my-2 border-b border-gray-300" />

      <View className="flex-col space-y-4">
        {/* Player 1 */}
        <View className="flex-row items-center">
          {status === MatchStatus.APPROVED && getRatingChangeDisplay(match.player1RatingChange)}
          <Text className="text-lg font-bold flex-1 text-blue-500">
            {player1.firstname[0]}. {player1.lastname} {winner === player1 && '✔'}
          </Text>
          <Text className="text-lg">{score ? score.map(s => s.player1Score).join(' ') : 'N/A'}</Text>
        </View>

        {/* Player 2 */}
        <View className="flex-row items-center">
          {status === MatchStatus.APPROVED && getRatingChangeDisplay(match.player2RatingChange)}
          <Text className="text-lg font-bold flex-1 text-blue-500">
            {player2.firstname[0]}. {player2.lastname} {winner === player2 && '✔'}
          </Text>
          <Text className="text-lg">{score ? score.map(s => s.player2Score).join(' ') : 'N/A'}</Text>
        </View>
      </View>

      {status === MatchStatus.PENDING && (
        <View className="mt-2 flex-row items-center gap-2">
          <MaterialIcons name="access-time" size={20} color="orange" />
          <Text className="text-orange-500">Match under review by {player2.firstname}</Text>
          <Text className="text-orange-500">{timeRemaining}</Text>
        </View>
      )}

      {actionButtons && <View className="mt-4 flex-row justify-between">{actionButtons}</View>}
    </View>
  );
};

export default MatchInfo;
