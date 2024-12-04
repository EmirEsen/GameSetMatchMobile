import icons from "@/constants/icons";
import { useState } from "react";
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

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base font-pmedium">{title}</Text>

      <View className="w-full h-16 px-4 bg-gray-100 rounded-2xl border-2 
      border-[#212AFBFF] 
      focus:border-[#96222291] flex flex-row items-center">
        <TextInput
          className="flex-1 font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
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