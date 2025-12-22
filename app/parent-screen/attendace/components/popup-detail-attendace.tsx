import { View, Text, Pressable, Animated, Dimensions } from "react-native";
import { useEffect, useRef } from "react";
import { router } from "expo-router";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import CloseIcon from "../../../../assets/icons/close.svg";

interface Props {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const SCREEN_HEIGHT = Dimensions.get("window").height;

const PopUpDetailAttendace: React.FC<Props> = ({
  open,
  onClose,
  children,
}) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (open) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [open]);

  if (!open) return null;

  return (
    <View className="absolute inset-0 z-50">
      {/* BACKDROP */}
      <Pressable
        className="flex-1 bg-black/40"
        onPress={onClose}
      />

      {/* POPUP */}
      <Animated.View
        style={{ transform: [{ translateY }] }}
        className="bg-white rounded-t-3xl px-4 pt-4 pb-6"
      >
        {/* HANDLE */}
        <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-3" />

        {/* HEADER */}
        <View className="flex flex-row justify-center items-center px-4 pb-4">
          <View className="flex-1 flex flex-col justify-start items-center gap-4">
            <View className="w-20 h-2 rounded-full bg-[#94A3B8] "></View>
            <Text className="text-2xl font-bold font-roboto text-gray-700">Chi tiết điểm danh</Text>
          </View>
          <Pressable className="absolute right-4 w-12 h-12 border border-neutral-200 rounded-xl flex justify-center items-center"
            onPress={onClose}
          >
            <CloseIcon />
          </Pressable>
        </View>

        {/* CONTENT */}
        {children}
      </Animated.View>
    </View>
  );
};

export default PopUpDetailAttendace;
