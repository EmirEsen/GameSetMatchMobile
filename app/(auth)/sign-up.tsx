import { View, Text, SafeAreaView, ScrollView, Alert, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchRegister } from '@/store/feature/authSlice';
import { IRegister } from '@/models/auth/IRegister';
import Toast from 'react-native-toast-message';

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",    
  } as IRegister);
  const [confirmPassword, setConfirmPassword] = useState("");

  const submit = async () => {
    if (form.email === "" || 
      form.password === "" || confirmPassword === "" || 
      form.firstname === "" || form.lastname === "") {
      return Alert.alert("Oops!", "Please fill in all fields");
    }

    if (form.password !== confirmPassword) {
      return Alert.alert("Oops!", "Passwords must match");
    }

    setSubmitting(true);

    try {
      const result = await dispatch(fetchRegister(form)).unwrap();
      console.log(result);
      if (result && result.code === 200) {        
        Toast.show({
          text1: "User signed in successfully",
          type: "success"
        });
        router.replace("/");
      } else if (result && result.code === 1002) {
        Toast.show({
          text1: result.message,
          type: "error"
        });
      }
    } catch (error) {
      Toast.show({
        text1: "An error occurred",
        type: "error"
      });
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
          className="w-full flex justify-center px-4"
          style={{
            minHeight: Dimensions.get("window").height - 200,
            paddingTop: 20
          }}
        >          
          <View className="flex-row items-center mt-2 justify-center self-center"
            style={{ borderBottomWidth: 2, borderBottomColor: '#212AFBFF' }}>
              <Text className="text-primary text-2xl font-bold">GAME</Text>
              <Text style={{ fontSize: 12 }} className="mx-1">🎾</Text>
              <Text className="text-primary text-2xl font-bold">SET</Text>
              <Text style={{ fontSize: 12 }} className="mx-1">🎾</Text>
              <Text className="text-primary text-2xl font-bold">MATCH</Text>          
          </View>         

          <View className="flex-row justify-between mt-7">
            <FormField
              title="Firstname"
              placeholder="Firstname"
              value={form.firstname}
              handleChangeText={(e) => setForm({ ...form, firstname: e })}
              otherStyles="flex-1 mr-2"
            />
            <FormField
              title="Lastname"
              placeholder="Lastname"
              value={form.lastname}
              handleChangeText={(e) => setForm({ ...form, lastname: e })}
              otherStyles="flex-1 ml-2"
            />
          </View>

          <FormField
            title="Email"
            placeholder="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-3"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            placeholder="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-3"
          />

          <FormField
            title="Password"
            placeholder="Confirm Password"
            value={confirmPassword}
            handleChangeText={(e) => setConfirmPassword(e)}
            otherStyles="mt-3"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-500 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"                       
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default SignUp