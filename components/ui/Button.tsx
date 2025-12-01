import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  className?: string;
  isDisabled?: boolean;
}

const CustomButton: React.FC<Props> = ({ title, onPress, className, backgroundColor, textColor, borderColor, isDisabled }) => {
  return (
    <Pressable
      onPress={onPress}
      className={`
        ${!isDisabled ? (backgroundColor ? backgroundColor : "bg-[#EA3E3E]") : "bg-[#1D1B201F]"}
        ${borderColor ? `border ${borderColor}` : ""}
        ${className}
        px-4 py-4 rounded-full w-full
        `}
      disabled={isDisabled}
    >
      <Text className={`text-2xl font-roboto font-bold text-center
         ${!isDisabled ? (textColor ? textColor : "text-white") : "text-gray-400"}`}
      >
        {title}
      </Text>
    </Pressable>
  );
};


export default CustomButton;
