import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Button, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

interface DateFieldProps {
    label: string;
    value?: string; // Optional to allow for no initial value
    onChange: (date: string) => void;
    minimumDate?: Date;
    maximumDate?: Date;
    isDisabled?: boolean;
    defaultValue?: string;
    mode?: 'date' | 'time' | 'datetime';
}

const DatePicker: React.FC<DateFieldProps> = ({ label, value, onChange, minimumDate, maximumDate, isDisabled, defaultValue, mode }) => {
    const [showModal, setShowModal] = useState(false);

    // Initialize tempDate with today's date if value is invalid or undefined
    const [tempDate, setTempDate] = useState(defaultValue ? new Date(defaultValue) : new Date());

    const handleConfirm = () => {
        onChange(dayjs(tempDate).format('YYYY-MM-DD'));
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            setTempDate(selectedDate);
        }
    };

    return (
        <View style={[styles.container, isDisabled && styles.disabledContainer]} pointerEvents={isDisabled ? 'none' : 'auto'}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                onPress={() => setShowModal(true)}
                style={styles.input}
            >
                <Text style={{ color: 'gray' }}>{mode === 'time' ? dayjs(tempDate).format('HH:mm') : (value || dayjs().format('YYYY-MM-DD'))}</Text>
            </TouchableOpacity>

            <Modal
                visible={showModal}
                transparent={true}
                animationType="none"
                onRequestClose={handleCancel}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.spinnerContainer}>
                            <DateTimePicker
                                value={tempDate}
                                mode={mode}
                                minimumDate={minimumDate}
                                maximumDate={maximumDate}
                                display="spinner"
                                onChange={handleDateChange}
                            />
                        </View>
                        <View style={styles.modalActions}>
                            <Button title="Cancel" onPress={handleCancel} color="red" />
                            <Button title="Confirm" onPress={handleConfirm} color="blue" />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 6,
        width: '45%'
    },
    label: {
        marginBottom: 8,
        color: 'blue',
    },
    input: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 1)'
    },
    modalContent: {
        borderRadius: 8,
        padding: 20,
        width: '80%',
    },
    spinnerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    disabledContainer: {
        opacity: 0.4, // Makes the container look disabled
    },
});

export default DatePicker;
