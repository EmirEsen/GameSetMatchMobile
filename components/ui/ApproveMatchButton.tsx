import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface ApproveMatchButtonProps {
    onApprove: () => void;
}

const ApproveMatchButton: React.FC<ApproveMatchButtonProps> = ({ onApprove }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onApprove}>
            <IconSymbol name="checkmark" size={12} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4caf50', // Success green
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        width: 100,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 8, // Space between text and icon
    },
    icon: {
        marginRight: 4,
    },
});

export default ApproveMatchButton;
