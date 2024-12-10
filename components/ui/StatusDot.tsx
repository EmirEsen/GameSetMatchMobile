import React from 'react';
import { View, Text } from 'react-native';

interface StatusDotProps {
    status: string;
}

const StatusDot: React.FC<StatusDotProps> = ({ status }) => {
    // Function to determine the color of the dot based on the tournament status
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ONGOING':
                return '#22C55E'; // Tailwind's bg-green-500
            case 'COMPLETED':
                return '#EF4444'; // Tailwind's bg-red-500
            case 'UPCOMING':
                return '#FACC15'; // Tailwind's bg-yellow-500
            default:
                return '#9CA3AF'; // Tailwind's bg-gray-400
        }
    };

    return (
        <View className="absolute top-2 right-4 flex-row items-center">
            {/* Status Text */}
            <Text className="text-xs text-gray-500">
                {status}
            </Text>
            {/* Status Dot */}
            <View
                style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: getStatusColor(status),
                    marginLeft: 8,
                }} />
        </View>
    );
};

export default StatusDot;
