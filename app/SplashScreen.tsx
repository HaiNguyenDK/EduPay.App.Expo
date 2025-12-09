import { View, Text, ImageBackground, Image, Animated, Easing } from "react-native";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import EdupayLogo from "../assets/icons/edupay.svg";;
import Spinner from "@/components/ui/Spinner";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const SplashScreen = () => {

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/(parent-tabs)/home"); // chuyển sang tabs
      // router.replace("/(auth)/user-infor");
    }, 2000);
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/Onboarding.jpg")}
      resizeMode="cover"
      className="flex w-full h-full z-0"
    >
      <View className="absolute inset-0 justify-center items-center">
        <View className="items-center">
          <EdupayLogo />
          <Text
            className="text-3xl font-bold text-white text-center leading-tight tracking-wider"
            style={{
              textShadowColor: "#A80033",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 6,
            }}
          >
            Tiện ích học đường{"\n"}thông minh
          </Text>
          <View className="mt-4">
            <Spinner size={40} strokeWidth={5} />
          </View>

        </View>
      </View>
    </ImageBackground>
  );
}
export default SplashScreen;