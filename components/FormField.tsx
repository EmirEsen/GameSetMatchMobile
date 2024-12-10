import icons from "@/constants/icons";
import { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

const FormField = ({
  title,
  value,
  placeholder = "",
  handleChangeText,
  otherStyles,
  ...props
}: {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles: string;
  keyboardType?: "email-address" | "default" | "numeric" | "phone-pad";
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text
        className="text-base font-pmedium"
        onPress={() => inputRef.current?.focus()}
      >
        {title}
      </Text>

      <View className={`w-full h-16 px-4 bg-gray-100 rounded-2xl border-2 
        ${isFocused ? 'border-[#212AFBFF]' : 'border-[#0006b581]'}
        flex flex-row items-center`}>
        <TextInput
          ref={inputRef}
          className="flex-1 font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;