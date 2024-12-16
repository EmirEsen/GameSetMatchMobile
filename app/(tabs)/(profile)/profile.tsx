import { AppDispatch } from '@/store';
import { logout } from '@/store/feature/authSlice';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';

export default function TabTwoScreen() {
    const dispatch = useDispatch<AppDispatch>();


    const handleLogout = () => {
        dispatch(logout());
    };


    return (
        <View className="flex-1 justify-center items-center bg-blue-500">
            <Text className="text-4xl text-white mb-4">Explore</Text>
            <View className="w-40">
                <Button title="Logout" onPress={handleLogout} color="#FF3B30" />
            </View>
        </View>
    );
}
