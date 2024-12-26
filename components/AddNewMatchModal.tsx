import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Alert,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { IPostMatch } from '@/models/post/IPostMatch';
import { useAppSelector } from '@/store';
import { IGetTournamentPlayer } from '@/models/get/IGetTournamentPlayer';
import { addNewMatch } from '@/store/feature/matchSlice';
import { AppDispatch } from '@/store';
import { LinearGradient } from 'expo-linear-gradient';
import DatePicker from './ui/DatePicker';
import dayjs from 'dayjs';
import MergedScorePicker from './ui/ScorePicker';
import PlayerPicker from './ui/TournamentPlayerPicker';
import { useMatchActions } from './actions/useMatchActions';

interface AddNewMatchProps {
    visible: boolean;
    onClose: () => void;
    tournamentId: string;
    tournamentPlayerList: IGetTournamentPlayer[];
}

const initialFormState: IPostMatch = {
    court: '',
    date: dayjs().format('YYYY-MM-DD'),
    time: dayjs().format('HH:mm'),
    player1Id: '',
    player2Id: '',
    score: [
        {
            player1Id: '',
            player1Score: 0,
            player2Id: '',
            player2Score: 0,
        },
    ],
    tournamentId: ''
};

const AddNewMatch = ({ visible, onClose, tournamentId, tournamentPlayerList }: AddNewMatchProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { handleMatchAddedToast } = useMatchActions();

    const loggedInProfile = useAppSelector((state) => state.player.loggedInProfile);
    const [editingSet, setEditingSet] = useState<number | null>(null);

    const [formState, setFormState] = useState<IPostMatch>({
        ...initialFormState,
        tournamentId: tournamentId,
        player1Id: loggedInProfile?.id || '',
    });

    useEffect(() => {
        if (visible) {
            setFormState({
                ...initialFormState,
                player1Id: loggedInProfile?.id || '',
                tournamentId: tournamentId,
            });
        }
    }, [visible, loggedInProfile, tournamentId]);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formState.court) newErrors.court = 'Court is required.';
        if (!formState.date) newErrors.date = 'Date is required.';
        if (!formState.player2Id) newErrors.player2Id = 'Select Opponent!';
        if (
            formState.score.length === 0 ||
            (formState.score[0].player1Score === 0 && formState.score[0].player2Score === 0)
        ) {
            newErrors.score = 'All sets must have valid scores';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (name: keyof IPostMatch, value: string | number) => {
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleScoreChange = (
        index: number,
        player1Score: number,
        player2Score: number
    ) => {
        const newScores = [...formState.score];
        newScores[index] = {
            ...newScores[index],
            player1Id: formState.player1Id,
            player2Id: formState.player2Id,
            player1Score,
            player2Score,
        };
        setFormState({
            ...formState,
            score: newScores,
        });
    };

    const addNewSet = () => {
        setFormState({
            ...formState,
            score: [
                ...formState.score,
                {
                    player1Id: formState.player1Id,
                    player1Score: 0,
                    player2Id: formState.player2Id,
                    player2Score: 0,
                },
            ],
        });
    };

    const removeLastSet = () => {
        if (formState.score.length > 1) {
            setFormState({
                ...formState,
                score: formState.score.slice(0, -1),
            });
        }
    };

    const handlePlayer2Change = (player2Id: string) => {
        const newScores = formState.score.map(score => ({
            ...score,
            player2Id
        }));
        setFormState({
            ...formState,
            player2Id,
            score: newScores
        });
    };

    const filteredPlayerList = tournamentPlayerList.filter(player => player.playerId !== loggedInProfile?.id);

    const handleSubmit = async () => {
        if (!validateForm()) return;
        try {
            const response = await dispatch(addNewMatch(formState)).unwrap();
            if (response) {
                const loggedInTournamentPlayer = tournamentPlayerList.find(
                    (player) => player.playerId === loggedInProfile?.id
                );

                if (loggedInTournamentPlayer) {
                    handleMatchAddedToast(loggedInTournamentPlayer); // Trigger the toast for the logged-in player
                }
                setFormState(initialFormState);
                onClose();
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to add match.');
        }
    };

    const handleCancel = () => {
        setEditingSet(null);
        setFormState(initialFormState);
        onClose();
    }

    return (
        <Modal visible={visible} animationType="none" transparent>
            <LinearGradient
                colors={["rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0.7)"]}
                style={{ flex: 1 }}
            >
                <View className="flex-1 justify-center items-center">
                    <View className="bg-[#081223] rounded-xl p-5 w-4/5 relative">
                        <View>
                            <Text style={styles.title}>Add New Match</Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Court"
                                placeholderTextColor="blue"
                                value={formState.court}
                                onChangeText={(text) => handleChange('court', text)}
                            />
                            {errors.court && <Text style={styles.error}>{errors.court}</Text>}

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginHorizontal: 8,
                                marginTop: 8,
                                marginBottom: 8
                            }}>
                                <DatePicker
                                    label="Date"
                                    value={formState.date ?? ''}
                                    onChange={(date) => handleChange('date', date)}
                                    mode="date"
                                />
                                <DatePicker
                                    label="Start Time"
                                    value={formState.time ?? ''}
                                    onChange={(time) => handleChange('time', time)}
                                    mode="time"
                                />
                            </View>

                            <PlayerPicker
                                selectedPlayer={formState.player2Id}
                                tournamentPlayerList={filteredPlayerList}
                                onChange={handlePlayer2Change}
                                error={errors.player2Id}
                            />


                            <View style={styles.scoreDisplayContainer}>
                                {formState.score.map((set, index) => (
                                    <TouchableOpacity key={index}
                                        onPress={() => setEditingSet(index)} // Set the current editing set                                            
                                    >
                                        <View style={[styles.scoreSetContainer, index < formState.score.length - 1 && { marginBottom: 15 }]}>
                                            <Text style={styles.setHeader}>{`Set ${index + 1}`}</Text>
                                            <View style={styles.scoreFieldContainer}>
                                                <View style={styles.scoreField}>
                                                    <Text style={styles.scoreLabel}>Your Score</Text>
                                                    <Text style={styles.scoreValue}>{set.player1Score}</Text>
                                                </View>
                                                <View style={styles.scoreField}>
                                                    <Text style={styles.scoreLabel}>Opponent's Score</Text>
                                                    <Text style={styles.scoreValue}>{set.player2Score}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>


                            {editingSet !== null && (
                                <MergedScorePicker
                                    visible={true}
                                    player1Score={formState.score[editingSet].player1Score}
                                    player2Score={formState.score[editingSet].player2Score}
                                    setLabel={`Set ${editingSet + 1}`}
                                    onScoreChange={(player1Score, player2Score) => {
                                        handleScoreChange(editingSet, player1Score, player2Score);
                                    }}
                                    onClose={() => setEditingSet(null)}
                                />
                            )}

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={addNewSet} className="p-2 w-1/3 items-center border-green-500 border rounded-xl">
                                    <Text className="text-green-500">Add Set</Text>
                                </TouchableOpacity>
                                {formState.score.length > 1 &&
                                    <TouchableOpacity onPress={removeLastSet} className="p-2 w-1/2 items-center border-yellow-400 border rounded-xl">
                                        <Text className="text-yellow-400">Remove Set</Text>
                                    </TouchableOpacity>}
                            </View>

                            <TouchableOpacity
                                onPress={handleSubmit}
                                style={{ backgroundColor: 'blue', padding: 10, borderRadius: 16, alignItems: 'center' }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Match</Text>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={handleCancel} style={{ marginTop: 15, borderWidth: 1, borderColor: 'red', padding: 8, borderRadius: 16, alignItems: 'center' }}>
                                <Text style={{ textAlign: 'center', color: 'red' }}>Cancel</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </LinearGradient>
        </Modal>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: 'blue',
    },
    input: {
        width: '95%',
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        alignSelf: 'center',
        color: 'gray',
    },
    error: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20,
        marginTop: 10,
    },
    setLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue',
        marginBottom: 5,
    },
    setScores: {
        fontSize: 14,
        color: 'white',
    },
    scoreDisplayContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#1a1a2e',
        borderRadius: 8,
    },
    scoreHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
    },
    scoreSetContainer: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#2a2a40',
    },
    setHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue',
        marginBottom: 4,
        textAlign: 'center',
        marginTop: -2
    },
    scoreFieldContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    scoreField: {
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
        borderRadius: 8,
        paddingVertical: 10,
        backgroundColor: '#333',
    },
    scoreLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    scoreValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4caf50',
    },

    playerPickerContainer: {
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 8,
        backgroundColor: '#1a1a2e',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    picker: {
        height: 50,
        color: 'white',
        justifyContent: 'center',
    },
    pickerItem: {
        textAlign: 'center',
    },



});

export default AddNewMatch;
