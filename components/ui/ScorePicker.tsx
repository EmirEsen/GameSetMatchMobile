import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    Button,
    Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface MergedScorePickerProps {
    visible: boolean;
    onClose: () => void;
    player1Score: number;
    player2Score: number;
    onScoreChange: (player1Score: number, player2Score: number) => void;
    setLabel: string; // Expecting "Set X" format
}

const MergedScorePicker: React.FC<MergedScorePickerProps> = ({
    visible,
    onClose,
    player1Score,
    player2Score,
    onScoreChange,
    setLabel,
}) => {
    const [tempPlayer1Score, setTempPlayer1Score] = useState(player1Score);
    const [tempPlayer2Score, setTempPlayer2Score] = useState(player2Score);

    const handleConfirm = () => {
        onScoreChange(tempPlayer1Score, tempPlayer2Score);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{setLabel} Scores</Text>
                    <View style={styles.row}>
                        <View style={styles.pickerContainer}>
                            <Text style={styles.label}>Your Score</Text>
                            <Picker
                                selectedValue={tempPlayer1Score}
                                onValueChange={(value) => setTempPlayer1Score(value)}
                                style={Platform.OS === 'ios' ? styles.iosPicker : undefined}
                            >
                                {[...Array(21).keys()].map((score) => (
                                    <Picker.Item key={score} label={`${score}`} value={score} />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Text style={styles.label}>Opponent's Score</Text>
                            <Picker
                                selectedValue={tempPlayer2Score}
                                onValueChange={(value) => setTempPlayer2Score(value)}
                                style={Platform.OS === 'ios' ? styles.iosPicker : undefined}
                            >
                                {[...Array(21).keys()].map((score) => (
                                    <Picker.Item key={score} label={`${score}`} value={score} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.buttonRow}>
                        <Button title="Cancel" onPress={onClose} color="#FF0000" />
                        <Button title="Confirm" onPress={handleConfirm} color="blue" />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#081223',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'blue',
    },
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'blue',
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pickerContainer: {
        flex: 1,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 16,
        padding: 2,
    },
    iosPicker: {
        marginTop: -40,
        width: '100%',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '100%',
    },
});

export default MergedScorePicker;
