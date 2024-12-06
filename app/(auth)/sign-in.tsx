import { View, Text, SafeAreaView, ScrollView, Alert, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '@/store/feature/authSlice';
import { AppDispatch } from '@/store';
import { IRegister } from '@/models/auth/IRegister';
import { ILogin } from '@/models/auth/ILogin';

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  } as ILogin);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await dispatch(fetchLogin(form));
      // const result = await getCurrentUser();
      // setUser(result);
      // setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      // router.replace("/home");
    } catch (error) {
      // Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
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
                <Text className="text-primary text-2xl font-bold">GAME</Text>
                <Text style={{ fontSize: 12 }} className="mx-1">🎾</Text>
                <Text className="text-primary text-2xl font-bold">SET</Text>
                <Text style={{ fontSize: 12 }} className="mx-1">🎾</Text>
                <Text className="text-primary text-2xl font-bold">MATCH</Text>          
            </View>         

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />

            <CustomButton
              title="Sign In"
              handlePress={() => {}}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />

            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-500 font-pregular">
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
  );
}

export default SignIn