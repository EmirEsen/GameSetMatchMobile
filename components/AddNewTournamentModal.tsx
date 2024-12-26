import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import dayjs from 'dayjs';
import DatePicker from './ui/DatePicker';
import TournamentDurationSwitch from './ui/TournamentDurationSwitch';
import MultipleSelectCheckmarks from './ui/MultipleSelectCheckmarks';
import TournamentPrivacyRadioButton from './ui/TournamentPrivacyRadioButton';
import { TournamentPrivacy } from '../models/enums/TournamentPrivacy';
import { AppDispatch, useAppSelector } from '@/store';
import { getMyTournaments } from '@/store/feature/tournamentSlice';
import { addNewTournament } from '@/store/feature/tournamentSlice';
import { useDispatch } from 'react-redux';
import { IPostTournament } from '@/models/post/IPostTournament';

interface AddTournamentModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (formData: any) => void;
}

const initialFormState: IPostTournament = {
    title: '',
    info: '',
    privacy: TournamentPrivacy.PUBLIC,
    isDurationFinite: false,
    startDate: null,
    endDate: null,
    participantIds: [],
    createdById: '',
    updatedAt: dayjs().toISOString(),
};

const AddTournamentModal: React.FC<AddTournamentModalProps> = ({ visible, onClose, onSubmit }) => {
    const dispatch = useDispatch<AppDispatch>();
    const loggedInProfile = useAppSelector((state) => state.player.loggedInProfile);

    const [formState, setFormState] = useState<IPostTournament>(initialFormState);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formState.title) newErrors.title = 'Title is required.';
        if (dayjs(formState.startDate).isAfter(dayjs(formState.endDate))) {
            newErrors.endDate = 'End date cannot be before start date.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (name: keyof typeof formState, value: any) => {
        setFormState((prevState) => ({
            ...prevState,
            createdById: loggedInProfile?.id ?? '',
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        await dispatch(addNewTournament(formState));
        await dispatch(getMyTournaments());
        onSubmit(formState);
        setFormState(initialFormState);
        onClose();
    };

    const handleClose = () => {
        setFormState(initialFormState);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="none" transparent>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <LinearGradient
                    colors={["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.5)"]}
                    style={styles.modalBackground}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.title}>Add New Tournament</Text>

                            {/* Title */}
                            <TextInput
                                style={styles.input}
                                placeholder="Tournament Title"
                                placeholderTextColor="blue"
                                value={formState.title}
                                onChangeText={(text) => handleChange('title', text)}
                            />
                            {errors.title && <Text style={styles.error}>{errors.title}</Text>}

                            {/* Info */}
                            <TextInput
                                style={[styles.input, { height: 80 }]}
                                placeholder="Tournament Info"
                                placeholderTextColor="blue"
                                value={formState.info}
                                onChangeText={(text) => handleChange('info', text)}
                                multiline
                            />

                            {/* Date Pickers */}
                            <View style={styles.datePickerContainer}>
                                <DatePicker
                                    label="Start Date"
                                    value={formState.startDate ?? ''}
                                    onChange={(date) => handleChange('startDate', date)}
                                    isDisabled={!formState.isDurationFinite}
                                    mode="date"
                                />
                                <DatePicker
                                    label="End Date"
                                    value={formState.endDate ?? ''}
                                    onChange={(date) => handleChange('endDate', date)}
                                    isDisabled={!formState.isDurationFinite}
                                    mode="date"
                                />
                            </View>
                            {errors.endDate && <Text style={styles.error}>{errors.endDate}</Text>}

                            <TournamentDurationSwitch
                                isFiniteDuration={formState.isDurationFinite}
                                handleSwitchChange={(value: boolean) => handleChange('isDurationFinite', value)}
                            />

                            <MultipleSelectCheckmarks
                                selectedItems={formState.participantIds}
                                onChange={(selected) => handleChange('participantIds', selected)}
                                loggedInUserId={loggedInProfile?.id ?? ''}
                            />

                            <TournamentPrivacyRadioButton
                                value={formState.privacy}
                                onChange={(value: TournamentPrivacy) => handleChange('privacy', value)}
                            />

                            <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
                                <Text style={styles.primaryButtonText}>Start Tournament</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#081223',
        borderRadius: 12,
        padding: 20,
        width: '85%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'blue',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: 'gray',
    },
    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 10,
    },
    primaryButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 16,
        alignItems: 'center',
        marginVertical: 10,
    },
    primaryButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'red',
        padding: 10,
        borderRadius: 16,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: 'red',
    },
});

export default AddTournamentModal;
