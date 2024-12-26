import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

interface TournamentDurationSwitchProps {
    isFiniteDuration: boolean;
    handleSwitchChange: (value: boolean) => void; // Updated to match React Native's `Switch` API
}

export default function TournamentDurationSwitch({
    isFiniteDuration,
    handleSwitchChange,
}: TournamentDurationSwitchProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Duration</Text>
            <Switch
                value={isFiniteDuration} // `checked` in MUI is equivalent to `value` in React Native
                onValueChange={handleSwitchChange} // Triggered with `true` or `false`
                thumbColor={isFiniteDuration ? '' : '#f4f3f4'} // Green when true, light gray when false
                trackColor={{ false: '#767577', true: 'blue' }} // Dark gray when false, light green when true
                style={styles.switch} // Custom styling for smaller size
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 8
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginRight: 10,
    },
    switch: {
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], // Reduces the size of the Switch
    },
});
