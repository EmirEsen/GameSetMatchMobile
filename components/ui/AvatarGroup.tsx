import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface AvatarProps {
    avatarUrl: string | null; // URL for avatar image, can be null
    initials?: string;       // Optional initials for fallback
}

interface AvatarGroupProps {
    avatars: AvatarProps[]; // Array of avatar objects with URL or initials
    max?: number;           // Maximum number of avatars to display
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ avatars, max = 5 }) => {
    const displayedAvatars = avatars.slice(0, max);
    const extraCount = avatars.length - max;

    return (
        <View style={styles.container}>
            {displayedAvatars.map((avatar, index) => (
                <View
                    key={index}
                    style={[styles.avatarContainer, { zIndex: max - index }]}
                >
                    {avatar.avatarUrl ? (
                        <Image
                            source={{ uri: avatar.avatarUrl }}
                            style={styles.avatarImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.initialsContainer}>
                            <Text style={styles.initialsText}>
                                {avatar.initials || "?"}
                            </Text>
                        </View>
                    )}
                </View>
            ))}

            {extraCount > 0 && (
                <View style={[styles.avatarContainer, styles.extraCount]}>
                    <Text style={styles.extraCountText}>+{extraCount}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    avatarContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        overflow: 'hidden',
        marginLeft: -10,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    initialsContainer: {
        backgroundColor: 'rgba(150, 150, 150, 0.8)',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    initialsText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    extraCount: {
        backgroundColor: 'rgba(150, 150, 150, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    extraCountText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
});

export default AvatarGroup;
