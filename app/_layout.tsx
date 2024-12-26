import { useFonts } from 'expo-font';
import { router, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import "../global.css";
import { Provider } from 'react-redux';
import store from '@/store';
import * as SecureStore from 'expo-secure-store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from 'burnt/web';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
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
      console.log('Token fetched from SecureStore:', savedToken); // Debug log
      setToken(savedToken);
    } catch (err) {
      console.error('Error fetching token:', err);
    }
  };

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Fetch token and wait for fonts to load
        await fetchToken();

        // Ensure fonts are loaded before proceeding
        if (fontsLoaded) {
          setIsAppReady(true);
        }
      } catch (err) {
        console.error('Error during app initialization:', err);
      } finally {
        // Hide splash screen once the app is ready
        SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, [fontsLoaded]);

  useEffect(() => {
    if (isAppReady) {
      if (token) {
        console.log('Navigating to tournaments page with token:', token);
        router.replace('/(tabs)/(tournaments)/tournamentList');
      } else {
        console.log('No token found, navigating to auth page.');
        router.replace('/');
      }
    }
  }, [isAppReady, token]);

  if (!isAppReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Slot />
      </GestureHandlerRootView>
      <Toaster position='bottom-right' />
      <StatusBar style="dark" />
    </Provider>
  );
}
