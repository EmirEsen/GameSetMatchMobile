import { Stack } from 'expo-router';

export default function Tournament() {
    return (
        <Stack>
            <Stack.Screen name="tournamentList" options={{ headerShown: false }} />
            <Stack.Screen name="[id]" options={{ title: 'Tournament' }} />
        </Stack>
    );
}
