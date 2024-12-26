import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { IGetTournamentPlayer } from '@/models/get/IGetTournamentPlayer';

interface PlayerPickerProps {
    selectedPlayer: string;
    tournamentPlayerList: IGetTournamentPlayer[];
    onChange: (playerId: string) => void;
    error?: string;
}

const PlayerPicker: React.FC<PlayerPickerProps> = ({ selectedPlayer, tournamentPlayerList, onChange, error }) => {
    const items = tournamentPlayerList.map((player) => ({
        label: `${player.firstname} ${player.lastname}`,
        value: player.playerId,
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Select Opponent</Text>
            <Dropdown
                data={items}
                labelField="label"
                valueField="value"
                placeholder="Select a player"
                value={selectedPlayer}
                onChange={(item) => onChange(item.value)}
                style={styles.dropdown}
                selectedTextStyle={styles.selectedText}
                placeholderStyle={styles.placeholder}
                containerStyle={styles.dropdownContainer}
                itemTextStyle={styles.itemText}
                activeColor="#4169E1"
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue',
        marginBottom: 5,
        textAlign: 'center',
    },
    dropdown: {
        borderWidth: 1,
        borderColor: 'blue',
        backgroundColor: '#1a1a2e',
        borderRadius: 8,
        padding: 10,
    },
    placeholder: {
        color: 'gray',
    },
    selectedText: {
        color: 'gray',
    },
    dropdownContainer: {
        backgroundColor: '#1a1a2e',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'blue',
    },
    itemText: {
        color: 'white',
    },
    error: {
        color: 'red',
        marginTop: 5,
    },
});

export default PlayerPicker;
