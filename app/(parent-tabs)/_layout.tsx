import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import ClockIcon from "../../assets/icons/clock-2.svg";
import HomeIcon2 from "../../assets/icons/home-2.svg";
import HomeIcon from "../../assets/icons/home.svg";
import NotifyIcon from "../../assets/icons/notification-bing-2.svg";
import ProfileIcon from "../../assets/icons/profile-2.svg";
import MyTabBar from "@/components/ui/MyTabBar";

export default function ParentTabLayout() {
  const colorScheme = useColorScheme();

  return (
    // <View className="flex-1 bg-white">
    //   {/* bọc tab bằng 1 container tailwind */}
    //   <Tabs
    //     screenOptions={{
    //       headerShown: false,
    //       tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,

    //       // Tab bar floating style
    //       tabBarStyle: {
    //         position: 'absolute',
    //         bottom: 20,
    //         left: 20,
    //         right: 20,
    //         height: 70,
    //         borderRadius: 30,
    //         backgroundColor: '#ffffff',
    //         shadowColor: '#000',
    //         shadowOpacity: 0.15,
    //         shadowRadius: 10,
    //         elevation: 5,
    //         paddingBottom: 10,
    //       }
    //     }}
    //   >
    //     <Tabs.Screen
    //       name="home"
    //       options={{
    //         // title: "Home",
    //         tabBarIcon: ({ focused }) => focused
    //           ? (
    //             <View className=" bg-[#EA3E3E] px-10 py-4 rounded-full w-full flex flex-row items-center gap-2">
    //               <HomeIcon />
    //               <Text>Trang chủ</Text>
    //             </View>
    //           ) : (
    //             <HomeIcon2 />
    //           ),
    //       }}
    //     />
    //     <Tabs.Screen
    //       name="histories"
    //       options={{
    //         title: "Histories",
    //       }}
    //     />
    //     <Tabs.Screen
    //       name="document"
    //       options={{
    //         title: "Documents",
    //       }}
    //     />
    //     <Tabs.Screen
    //       name="notify"
    //       options={{
    //         title: "Notify",
    //       }}
    //     />
    //   </Tabs>
    // </View>

    <Tabs screenOptions={{ headerShown: false }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: "Trang chủ" }} />
      <Tabs.Screen name="histories" options={{ title: "Lịch sử" }} />
      <Tabs.Screen name="notify" options={{ title: "Thông báo" }} />
      <Tabs.Screen name="document" options={{ title: "Hồ sơ" }} />
    </Tabs>
  );
}
