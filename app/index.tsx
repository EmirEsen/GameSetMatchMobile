import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";


const Welcome = () => {
  
  return (
    <SafeAreaView className="bg-white h-full">      

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

          <Text className="text-sm font-pregular text-gray mt-7 text-center">
            Serve, Play, Win, Repeat - Record Your GAME-SET-MATCH! Track your matches, 
            connect with players, and ignite the competitive spirit in your tennis community.
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-up")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
    </SafeAreaView>
  );
};

export default Welcome;