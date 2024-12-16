import { View, Text, SafeAreaView, ScrollView, Alert, Dimensions, KeyboardAvoidingView, Platform, StatusBar, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '@/store/feature/authSlice';
import { AppDispatch } from '@/store';
import { ILogin } from '@/models/auth/ILogin';
import image from '../../assets/images/ballcorner.jpg';
import { LinearGradient } from 'expo-linear-gradient';

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  } as ILogin);

  const submit = async () => {
    if (form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setSubmitting(true);

    dispatch(fetchLogin(form))
      .then(async (res) => {
        const payload = res.payload;
        if (payload && typeof payload === 'object' && 'code' in payload && payload.code === 200) {
          console.log('inside fetchLogin', payload);
          router.replace("/(tabs)/(tournaments)/tournamentList");
        } else if (payload && typeof payload === 'object' && 'code' in payload && payload.code > 1000) {
          Alert.alert('Error', payload.message);
        } else {
          Alert.alert('An unexpected error occurred, Try again later.');
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <ImageBackground source={image} resizeMode="cover" className="flex-1" >
      <LinearGradient className="flex-1" colors={["rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 0.4)"]}>
        <SafeAreaView className="h-full">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView>
              <View
                className="w-full flex justify-center h-full px-4"
                style={{
                  minHeight: Dimensions.get("window").height - 200,
                  paddingTop: 20
                }}
              >
                <Text className="text-2xl text-primary font-bold text-center">
                  Sign in to
                </Text>
                <View className="flex-row items-center mt-2 justify-center self-center"
                  style={{ borderBottomWidth: 2, borderBottomColor: '#212AFBFF' }}>
                  <Text className="text-primary text-3xl font-bold">GAME</Text>
                  <Text style={{ fontSize: 12 }} className="mx-1">🎾</Text>
                  <Text className="text-primary text-3xl font-bold">SET</Text>
                  <Text style={{ fontSize: 12 }} className="mx-1">🎾</Text>
                  <Text className="text-primary text-3xl font-bold">MATCH</Text>
                </View>

                <FormField
                  title="Email"
                  placeholder='Email'
                  value={form.email}
                  handleChangeText={(e) => setForm({ ...form, email: e })}
                  otherStyles="mt-7"
                  keyboardType="email-address"
                />

                <FormField
                  title="Password"
                  placeholder='Password'
                  value={form.password}
                  handleChangeText={(e) => setForm({ ...form, password: e })}
                  otherStyles="mt-7"
                />

                <CustomButton
                  title="Sign In"
                  handlePress={submit}
                  containerStyles="mt-7"
                  isLoading={isSubmitting}
                />

                <View className="flex justify-center pt-5 flex-row gap-2">
                  <Text className="text-lg text-gray-100 font-pregular">
                    Don't have an account?
                  </Text>
                  <Link
                    href="/sign-up"
                    className="text-lg font-psemibold text-secondary"
                  >
                    Signup
                  </Link>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}

export default SignIn