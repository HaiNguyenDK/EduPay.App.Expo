import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function OTP() {
  const { data } = useLocalSearchParams();

  const parsed = data ? JSON.parse(data as string) : null;

  console.log("Object nhận được:", parsed);
  return (
    <View className="flex-1 justify-center items-center">
      <Text>OTP</Text>
    </View>
  )
}