import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View, Pressable, Text } from "react-native";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import HomeIcon from "../../assets/icons/home.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import HomeIcon2 from "../../assets/icons/home-2.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ClockIcon from "../../assets/icons/clock-2.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ClockIconActive from "../../assets/icons/clock.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import NotifyIcon from "../../assets/icons/notification-bing-2.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import NotifyIconActive from "../../assets/icons/notification-bing.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ProfileIcon from "../../assets/icons/profile-circle-2.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ProfileIconActive from "../../assets/icons/profile-circle.svg";

export default function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {

  // Lấy icon theo tên + trạng thái
  const getIcon = (name: string, focused: boolean) => {
    switch (name) {
      case "home":
        return focused
          ? <HomeIcon width={26} height={26} fill="#fff" />
          : <HomeIcon2 width={26} height={26} />;

      case "histories":
        return focused
          ? <ClockIconActive width={26} height={26} fill="#fff" />
          : <ClockIcon width={26} height={26} />;

      case "notify":
        return focused
          ? <NotifyIconActive width={26} height={26} fill="#fff" />
          : <NotifyIcon width={26} height={26} />;

      case "document":
        return focused
          ? <ProfileIconActive width={26} height={26} fill="#fff" />
          : <ProfileIcon width={26} height={26} />;

      default:
        return null;
    }
  };

  // Lấy label theo tên route
  const getLabel = (name: string) => {
    switch (name) {
      case "home":
        return "Trang chủ";
      case "histories":
        return "Lịch sử";
      case "notify":
        return "Thông báo";
      case "document":
        return "Hồ sơ";
    }
  };

  return (
    <View className="absolute bottom-4 left-0 right-0 mx-4 bg-white
     rounded-full shadow-lg flex-row px-4 py-3 items-center">

      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const label = getLabel(route.name);
        const icon = getIcon(route.name, isFocused);

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            className="flex-1 items-center"
          >
            {isFocused ? (
              <View className="flex-row items-center bg-red-500 px-5 py-3 rounded-full">
                {icon}
                <Text className="text-white ml-1 text-[9px] font-bold">{label}</Text>
              </View>
            ) : (
              <View className="p-2">{icon}</View>
            )}
          </Pressable>
        );
      })}

    </View>
  );
}
