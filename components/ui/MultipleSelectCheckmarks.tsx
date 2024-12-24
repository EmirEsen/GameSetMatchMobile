import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { AppDispatch, useAppSelector } from '../../store';
import { getPlayerProfileList } from '@/store/feature/playerSlice';
import { useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { MultiSelect } from 'react-native-element-dropdown';

interface MultipleSelectProps {
    selectedItems: string[];
    label?: string;
    onChange: (selectedIds: string[]) => void;
    loggedInUserId: string; // Pass logged-in user ID to exclude them from the list
}

export default function MultipleSelectCheckmarks({
    onChange,
    selectedItems,
    label,
    loggedInUserId,
}: MultipleSelectProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [selected, setSelected] = useState<string[]>(selectedItems);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const players = useAppSelector((state) => state.player.playerList);

    useEffect(() => {
        dispatch(getPlayerProfileList());
    }, [dispatch]);

    // Filter out the logged-in user and prepare the data for MultiSelect
    const data = useMemo(
        () =>
            players
                .filter(player => player.id !== loggedInUserId) // Remove logged-in user
                .map(player => ({
                    label: `${player.firstname} ${player.lastname}`,
                    value: player.id
                })),
        [players, loggedInUserId]
    );

    const handleSelectionChange = (items: any) => {
        setSelected(items);
        onChange(items); // Pass selected items to parent
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            {/* Display selected player names */}
            {selected.length > 0 && (
                <Text style={styles.selectedNames}>
                    {selected.map(id => {
                        const player = players.find(player => player.id === id);
                        return player ? `${player.firstname} ${player.lastname}` : null;
                    }).join(', ')}
                </Text>
            )}

            <TouchableOpacity onPress={toggleModal} style={styles.selectButton}>
                <Text style={styles.buttonText}>Select Participants</Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Select Participants</Text>
                        <MultiSelect
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            search
                            data={data}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Participants"
                            searchPlaceholder="Search items..."
                            value={selected}
                            onChange={handleSelectionChange}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={styles.icon}
                                    color="black"
                                    name="team"
                                    size={20}
                                />
                            )}
                            selectedStyle={styles.selectedStyle}
                            renderItem={(item: { label: string; value: string }, selected?: boolean) => (
                                <View style={styles.itemContainer}>
                                    <Text style={styles.itemText}>{item.label}</Text>
                                    {selected && (
                                        <AntDesign
                                            name="checkcircle"
                                            size={20}
                                            color="#007AFF"
                                            style={styles.checkIcon}
                                        />
                                    )}
                                </View>
                            )}
                        />

                        <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 10, marginBottom: 10 },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    selectButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#007AFF',
        borderRadius: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#007AFF',
        fontSize: 16,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)', // Semi-transparent background
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dropdown: {
        height: 50,
        backgroundColor: 'transparent',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        width: '100%',
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#999',
    },
    selectedTextStyle: {
        fontSize: 14,
        color: '#333',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: '#333',
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
        borderColor: '#007AFF',
        borderWidth: 1,
        padding: 8,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
    checkIcon: {
        marginLeft: 10,
    },
    selectedNames: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
    },
});
