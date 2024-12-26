import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface RejectMatchButtonProps {
    onReject: () => void;
}

const RejectMatchButton: React.FC<RejectMatchButtonProps> = ({ onReject }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onReject}>
            <IconSymbol name="xmark" size={12} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f44336', // Error red
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        width: 100,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 8, // Space between icon and text
    },
    icon: {
        marginRight: 4,
    },
});

export default RejectMatchButton;
