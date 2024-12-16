import { IconSymbol } from '@/components/ui/IconSymbol';
import { router, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function Tournament() {
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: '#081223',
            },
            headerTitleStyle: {
                color: 'white',
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                    <IconSymbol name="chevron.left" size={20} color="white" />
                </TouchableOpacity>
            ),

        }}>
            <Stack.Screen name="tournamentList" options={{ headerShown: false }} />
            <Stack.Screen name="[id]" options={{ title: 'Tournament' }} />
        </Stack>
    );
}
