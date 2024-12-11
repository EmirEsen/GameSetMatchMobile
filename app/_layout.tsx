import { useFonts } from 'expo-font';
import { router, Stack, Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import "../global.css";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from '@/store';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/components/ui/toastConfig';
import * as SecureStore from 'expo-secure-store';
import { Image } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  const [token, setToken] = useState<string | null>(null);
  const [isAppReady, setIsAppReady] = useState(false);

  const fetchToken = async () => {
    try {
      const savedToken = await SecureStore.getItemAsync('token');
      setToken(savedToken);
    } catch (err) {
      console.error('Error fetching token:', err);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(err =>
        console.error('Error hiding splash screen:', err)
      );
      setIsAppReady(true);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (isAppReady && token !== null) {
      router.replace('/my-tournaments');
    } else if (isAppReady && token === null) {
      router.replace('/');
    }
  }, [isAppReady, token]);

  if (!isAppReady) {
    return null; // Prevent rendering until the app is ready
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          />
          {/* These are your screens defined as per expo-router */}
          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="[tournamentId]"
            options={{
              headerTitle: "Tournament",
              headerLeft: () => (
                <Image
                  source={require('../assets/images/sampleimage.jpg')}
                  style={{ width: 36, height: 36, resizeMode: 'cover', borderRadius: 100 }}
                />
              )
            }}
          />
          {/* Fallback Screen */}
          <Stack.Screen
            name="+not-found"
            options={{ headerShown: false, title: 'Not Found' }}
          />
        </Stack>

        <Toast config={toastConfig} />
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </Provider>
  );
}
