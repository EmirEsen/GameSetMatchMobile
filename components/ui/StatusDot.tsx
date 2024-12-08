import React from 'react';
import { View, Text } from 'react-native';

interface StatusDotProps {
    status: string;
}

const StatusDot: React.FC<StatusDotProps> = ({ status }) => {
    // Function to determine the color of the dot based on the tournament status
    const getStatusColor = (status: string) => {
        switch (status) {
            case "ONGOING":
                return "bg-green-500";
            case "COMPLETED":
                return "bg-red-500";
            case "UPCOMING":
                return "bg-yellow-500";
            default:
                return "bg-gray-400"; // Default color if status is unknown
        }
    };

    return (
        <View className="absolute top-2 right-4 flex-row items-center">
            {/* Status Text */}
            <Text className="text-xs text-gray-500">
                {status}
            </Text>
            {/* Status Dot */}
            <View className={`w-2.5 h-2.5 rounded-full ml-2 ${getStatusColor(status)}`} />
        </View>
    );
};

export default StatusDot;
