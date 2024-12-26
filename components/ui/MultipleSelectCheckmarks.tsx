import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../store';
import { getPlayerProfileList } from '@/store/feature/playerSlice';

interface MultipleSelectProps {
    selectedItems: string[];
    label?: string;
    onChange: (selectedIds: string[]) => void;
    loggedInUserId: string;
}

const MultipleSelectCheckmarks: React.FC<MultipleSelectProps> = ({
    onChange,
    selectedItems,
    label,
    loggedInUserId,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [selected, setSelected] = useState<string[]>(selectedItems);
    const players = useAppSelector((state) => state.player.playerList);

    useEffect(() => {
        dispatch(getPlayerProfileList());
    }, [dispatch]);

    const data = useMemo(
        () =>
            players
                .filter((player) => player.id !== loggedInUserId)
                .map((player) => ({
                    label: `${player.firstname} ${player.lastname}`,
                    value: player.id,
                })),
        [players, loggedInUserId]
    );

    const handleSelectionChange = (items: string[]) => {
        setSelected(items);
        onChange(items);
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <MultiSelect
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Select Participants"
                value={selected}
                onChange={handleSelectionChange}
                style={styles.dropdown}
                placeholderStyle={styles.placeholder}
                selectedTextStyle={styles.selectedText}
                itemTextStyle={styles.itemText}
                activeColor="#4169E1"
                selectedStyle={styles.selectedStyle}
                inputSearchStyle={styles.inputSearch}
                containerStyle={styles.dropdownContainer}
                search
                searchPlaceholder="Search participants"
            />
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
        fontSize: 16,
    },
    selectedText: {
        color: 'white',
        fontSize: 14,
    },
    itemText: {
        color: 'white',
        fontSize: 14,
    },
    selectedStyle: {
        borderRadius: 12,
        borderColor: 'blue',
        borderWidth: 1,
        padding: 8,
        backgroundColor: '#1a1a2e',
    },
    inputSearch: {
        fontSize: 14,
        color: 'white',
        backgroundColor: '#1a1a2e',
        borderRadius: 8,
        borderColor: 'gray',
    },
    selectedNames: {
        fontSize: 14,
        color: '#fff',
        marginTop: 10,
        textAlign: 'center',
    },
    dropdownContainer: {
        backgroundColor: '#1a1a2e',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'blue',
    },
});

export default MultipleSelectCheckmarks;
