import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';

import { TournamentPrivacy } from '../models/enums/TournamentPrivacy';
import { LinearGradient } from 'expo-linear-gradient';
import TournamentDurationSwitch from './ui/TournamentDurationSwitch';
import DatePicker from './ui/DatePicker';
import MultipleSelectCheckmarks from './ui/MultipleSelectCheckmarks';
import { AppDispatch, useAppSelector } from '@/store';
import TournamentPrivacyRadioButton from './ui/TournamentPrivacyRadioButton';
import { IPostTournament } from '@/models/post/IPostTournament';
import { useDispatch } from 'react-redux';
import { addNewTournament, getMyTournaments } from '@/store/feature/tournamentSlice';



interface AddTournamentModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (formData: any) => void;
}


const AddTournamentModal: React.FC<AddTournamentModalProps> = ({ visible, onClose, onSubmit }) => {
    const dispatch = useDispatch<AppDispatch>();
    const loggedInUserId = useAppSelector((state) => state.player.loggedInProfile?.id);

    const initialFormState: IPostTournament = {
        title: '',
        info: '',
        privacy: TournamentPrivacy.PUBLIC,
        isDurationFinite: false,
        startDate: null,
        endDate: null,
        participantIds: [],
        createdById: loggedInUserId ?? '',
        updatedAt: dayjs().toISOString(),
    };

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
    const handleChange = (name: keyof typeof formState, value: typeof formState[keyof typeof formState]) => {
        setFormState((prevState) => {
            const updatedState = { ...prevState, [name]: value };

            if (name === 'startDate' && dayjs(value as string).isAfter(dayjs(prevState.endDate))) {
                updatedState.endDate = value as string;
            }

            return updatedState;
        });
    };

    const handleParticipantChange = (selectedParticipants: string[]) => {
        handleChange('participantIds', selectedParticipants);
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        await dispatch(addNewTournament(formState));
        await dispatch(getMyTournaments());
        onSubmit(formState);
        handleClose();
    };

    const handleClose = () => {
        setFormState(initialFormState); // Reset form state
        onClose(); // Call parent onClose
    };


    return (
        <Modal visible={visible} animationType="none" transparent>
            <LinearGradient
                colors={["rgba(0, 0, 0, 0.7)", "rgba(0, 0, 0, 0.7)"]}
                style={{ flex: 1 }}
            >
                <View className="flex-1 justify-center items-center">
                    <View className="bg-white rounded-xl p-5 w-4/5 relative">
                        <Text className="text-lg font-bold mb-4 text-center">Add New Tournament</Text>
                        <View>
                            {/* Title */}
                            <Text>Title</Text>
                            <TextInput
                                placeholder="Tournament Title"
                                value={formState.title}
                                onChangeText={(text) => handleChange('title', text)}
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    padding: 8,
                                    marginVertical: 5,
                                    borderRadius: 5,
                                }}
                            />
                            {errors.title && <Text style={{ color: 'red' }}>{errors.title}</Text>}

                            {/* Info */}
                            <Text>Info</Text>
                            <TextInput
                                placeholder="Tournament Info"
                                value={formState.info}
                                onChangeText={(text) => handleChange('info', text)}
                                multiline
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    padding: 8,
                                    marginVertical: 5,
                                    borderRadius: 5,
                                    height: 80,
                                }}
                            />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <DatePicker
                                        label="Start Date"
                                        value={formState.startDate ?? ''}
                                        onChange={(date) => handleChange('startDate', date)}
                                        isDisabled={!formState.isDurationFinite}
                                        mode="date"
                                    />
                                </View>
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <DatePicker
                                        label="End Date"
                                        value={formState.endDate ?? ''}
                                        defaultValue={formState.startDate ?? ''}
                                        minimumDate={new Date(formState.startDate ?? '')}
                                        onChange={(date) => handleChange('endDate', date)}
                                        isDisabled={!formState.isDurationFinite}
                                        mode="date"
                                    />
                                </View>
                            </View>


                            <TournamentDurationSwitch
                                isFiniteDuration={formState.isDurationFinite}
                                handleSwitchChange={(value: boolean) => handleChange('isDurationFinite', value)}
                            />


                            {/* MultipleSelectCheckmarks Integration */}
                            <MultipleSelectCheckmarks
                                selectedItems={formState.participantIds}
                                onChange={handleParticipantChange}
                                loggedInUserId={loggedInUserId ?? ''}
                            />


                            <TournamentPrivacyRadioButton
                                value={formState.privacy}
                                onChange={(value: TournamentPrivacy) => handleChange('privacy', value)}
                            />


                            {/* Submit Button */}
                            <TouchableOpacity
                                onPress={handleSubmit}
                                style={{ backgroundColor: '#007BFF', padding: 10, borderRadius: 16, alignItems: 'center' }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Start Tournament</Text>
                            </TouchableOpacity>

                            {/* Cancel Button */}
                            <TouchableOpacity onPress={handleClose} style={{ marginTop: 10, borderWidth: 1, borderColor: '#007BFF', padding: 10, borderRadius: 16, alignItems: 'center' }}>
                                <Text style={{ textAlign: 'center', color: '#007BFF' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </Modal>
    );
};

export default AddTournamentModal;
