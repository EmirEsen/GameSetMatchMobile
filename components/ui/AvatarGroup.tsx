import React from 'react';
import { View, Image, Text } from 'react-native';

interface AvatarGroupProps {
    avatars: string[]; // Array of avatar URLs
    max?: number;      // Maximum number of avatars to display
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ avatars, max = 5 }) => {
    // Limit the displayed avatars based on the max value
    const displayedAvatars = avatars.slice(0, max);
    const extraCount = avatars.length - max;

    return (
        <View className="flex-row items-center">
            {displayedAvatars.map((avatar, index) => (
                <View
                    key={index}
                    className="w-8 h-8 rounded-full overflow-hidden border-2 border-white -ml-3"
                    style={{ zIndex: max - index }}
                >
                    <Image source={{ uri: avatar }} className="w-full h-full" resizeMode="cover" />
                </View>
            ))}

            {extraCount > 0 && (
                <View className="w-8 h-8 rounded-full bg-gray-300 border-1 border-white -ml-3 flex items-center justify-center">
                    <Text className="text-xs font-bold text-gray-700">+{extraCount}</Text>
                </View>
            )}
        </View>
    );
};

export default AvatarGroup;
