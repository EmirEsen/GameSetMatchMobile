import { TournamentPrivacy } from '@/models/enums/TournamentPrivacy';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


interface RadioButtonProps {
    label: string;
    selected: boolean;
    onPress: () => void;
}

function RadioButton({ label, selected, onPress }: RadioButtonProps) {
    return (
        <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
            <View style={styles.circle}>
                {selected && <View style={styles.innerCircle} />}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
}

export default function TournamentPrivacyRadioButton({ value, onChange }: { value: TournamentPrivacy, onChange: (value: TournamentPrivacy) => void }) {
    const options = [
        { label: 'Public', value: TournamentPrivacy.PUBLIC },
        { label: 'Private', value: TournamentPrivacy.PRIVATE },
        { label: 'Your Network', value: TournamentPrivacy.USER_NETWORK },
    ];

    return (
        <View style={styles.container}>
            {options.map((option) => (
                <RadioButton
                    key={option.value}
                    label={option.label}
                    selected={option.value === value}
                    onPress={() => onChange(option.value)}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Align buttons in a row
        justifyContent: 'space-evenly',
        marginBottom: 10
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 5
    },
    circle: {
        height: 18,
        width: 18,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF', // White background for the gap
    },
    innerCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#007AFF', // Selected color
    },
    label: {
        marginLeft: 5,
        fontSize: 14,
    },
});