import CustomButton from "@/components/CustomButton";
import { router, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { ImageBackground, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import image from '../assets/images/pexels.jpg';
import { LinearGradient } from "expo-linear-gradient";

SplashScreen.preventAutoHideAsync();

const Welcome = () => {

  return (
    <ImageBackground source={image} resizeMode="cover" className="flex-1">
      <LinearGradient className="flex-1" colors={["rgba(219, 112, 147, 0.3)", "rgba(0, 0, 0, 0.2)"]}>
        <SafeAreaView
        // className="bg-white h-full"
        >

          <ScrollView
            contentContainerStyle={{
              height: "100%"
            }}
          >
            <View className="w-full flex justify-center items-center h-full px-4">
              <View className="relative mt-5">
                <Text className="text-2xl text-primary font-bold text-center">
                  Elevate Your Tennis Journey with
                </Text>
                <View className="flex-row items-center mt-2 justify-center self-center"
                  style={{ borderBottomWidth: 2, borderBottomColor: '#212AFBFF' }}>
                  <Text className="text-primary text-2xl font-bold">GAME</Text>
                  <Text style={{ fontSize: 12 }} className="mx-1">🎾</Text>
                  <Text className="text-primary text-2xl font-bold">SET</Text>
                  <Text style={{ fontSize: 12 }} className="mx-1">🎾</Text>
                  <Text className="text-primary text-2xl font-bold">MATCH</Text>
                </View>
              </View>

              <Text className="text-m font-pregular text-primary mt-7 text-center">
                Serve, Play, Win, Repeat!{"\n"} Record Your GAME-SET-MATCH! Track your matches, tournaments,
                connect with players, and ignite the competitive spirit in your tennis community.
              </Text>

              <CustomButton
                title="Continue with Email"
                handlePress={() => router.push("/(auth)/sign-up")}
                containerStyles="w-full mt-7"
              />
            </View>
          </ScrollView>

          <StatusBar backgroundColor="#161622" style="dark" />
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Welcome;