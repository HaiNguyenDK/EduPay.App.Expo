import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  className?: string;
}

const CustomButton: React.FC<Props> = ({ title, onPress, className, backgroundColor, textColor, borderColor }) => {
  return (
    <Pressable
      onPress={onPress}
      className={`
        ${backgroundColor ? backgroundColor : "bg-[#EA3E3E]"}
       ${borderColor ? `border ${borderColor}` : ""}
        ${className}
        px-4 py-4 rounded-full w-full
        `}
    >
      <Text className={`text-2xl font-roboto font-bold text-center ${textColor ? textColor : "text-white"}`}>{title}</Text>
    </Pressable>
  );
};


export default CustomButton;
