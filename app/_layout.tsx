import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="SplashScreen" options={{ headerShown: false }} />
        <Stack.Screen name="Wellcome" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/register/phone" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/register/otp" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/register/set-password" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/user-biometry" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/user-infor" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/forgot-password/phone-input" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/forgot-password/otp-fp" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/forgot-password/reset-password" options={{ headerShown: false }} />

        <Stack.Screen name="(parent-tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="parent-screen/search-student" options={{ headerShown: false }} />
        <Stack.Screen name="parent-screen/list-bill" options={{ headerShown: false }} />
        <Stack.Screen name="parent-screen/food" options={{ headerShown: false }} />
        <Stack.Screen name="parent-screen/schedule" options={{ headerShown: false }} />
        <Stack.Screen name="parent-screen/leave" options={{ headerShown: false }} />
        <Stack.Screen name="parent-screen/attendance" options={{ headerShown: false }} />

        {/* <Stack.Screen name="parent-screen/bill/list-bill" options={{ headerShown: false }} /> */}
        <Stack.Screen name="parent-screen/bill/detail-bill" options={{ headerShown: false, presentation: "modal" }} />
        <Stack.Screen name="parent-screen/bill/package-payment" options={{ headerShown: false }} />
        <Stack.Screen name="parent-screen/bill/package-payment-type" options={{ headerShown: false }} />
        <Stack.Screen name="parent-screen/bill/payment-detail" options={{ headerShown: false }} />
        {/* <Stack.Screen name="parent-screen/bill/package-payment-success" options={{ headerShown: false }} /> */}

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <Toast />
    </ThemeProvider>
  );
}
