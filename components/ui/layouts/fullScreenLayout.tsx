import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import CloseIcon from "../../../assets/icons/close.svg";
import { router } from "expo-router";

interface Props {
  title?: string,
  children: React.ReactNode
}
const FullScreenLayout: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      {/* <StatusBar translucent={false} backgroundColor="#fff" style="auto" /> */}
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View className="flex-1 w-full flex flex-col gap-4">

          <View className="flex flex-row justify-center items-center px-4 pb-4">
            <View className="flex-1 flex flex-col justify-start items-center gap-4">
              <View className="w-20 h-2 rounded-full bg-[#94A3B8] "></View>
              <Text className="text-2xl font-bold font-roboto text-gray-700">{title}</Text>
            </View>
            <Pressable className="absolute right-4 w-12 h-12 border border-neutral-200 rounded-xl flex justify-center items-center"
              onPress={() => router.back()}
            >
              <CloseIcon />
            </Pressable>
          </View>

          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "padding"} // iOS: padding, Android: height
            keyboardVerticalOffset={Platform.OS === "ios" ? 160 : 160} // điều chỉnh offset nếu cần
            className="mt-5"
          >
            <ScrollView
              className="px-2"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
              keyboardShouldPersistTaps="handled"
            >
              <View className="flex flex-col gap-2 px-4">
                {children}
              </View>

            </ScrollView>
          </KeyboardAvoidingView>

        </View>
      </SafeAreaView >
    </>
  );
}

export default FullScreenLayout