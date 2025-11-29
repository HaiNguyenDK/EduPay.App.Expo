import React from "react";
import { View, Image, Dimensions, Text, Button, Pressable } from "react-native";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import TeacherIcon from "../assets/icons/teacher.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ParentIcon from "../assets/icons/parent.svg";
import Carousel from "react-native-reanimated-carousel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import Header from "@/components/ui/Header";

const { width } = Dimensions.get("window");

const data = [
  {
    title: "Tra cứu nhanh chóng",
    img: require("../assets/images/quick-search.jpg"),
    desc: "Hệ thống kết nối hơn hàng nghìn trường học khắp Việt Nam"
  },
  {
    title: "Tiết kiệm thời gian",
    img: require("../assets/images/save-time.jpg"),
    desc: "Tra cứu học phí và thanh toán thông minh với mã học sinh"
  },
  {
    title: "Minh bạch, an toàn",
    img: require("../assets/images/safe.jpg"),
    desc: "Mọi giao dịch học phí đều được đảm bảo minh bạch và an toàn tuyệt đối"
  },
];

const PaginationItem = ({
  index,
  progress,
}: {
  index: number;
  progress: Animated.SharedValue<number>;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const isActive = Math.round(progress.value) === index;
    return {
      width: withTiming(isActive ? 40 : 12, { duration: 300 }),
      backgroundColor: withTiming(isActive ? "#A80033" : "#D1D5DB", {
        duration: 300,
      }),
    };
  });

  return (
    <Animated.View
      className="h-3 rounded-full mx-1.5" // Các style tĩnh giữ nguyên ở className
      style={animatedStyle} // Các style động (width, color) đưa vào style
    />
  );
};

export default function Wellcome() {
  // THAY ĐỔI LỚN: Dùng useSharedValue thay cho useState
  const progress = useSharedValue(0);
  const [rule, setRule] = React.useState<string>('');
  const router = useRouter();

  const handleChoose = async (rule: string) => {
    setRule(rule);
    await AsyncStorage.setItem("rule", rule);
    router.push("/(auth)/login"); //chuyển sang screen khác có thể back (replace chuyển sang screen khác mà k thể back)
  };

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex justify-center items-center px-6 gap-2                       ">
      <Image
        source={item.img}
        resizeMode="cover"
      />
      <Text className="text-3xl font-bold">{item.title}</Text>
      <Text className="text-center text-base text-neutral-500">{item.desc}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white pb-20 font-roboto">
      {/* Header + Logo */}
      <Header />

      {/* Carousel + Pagination */}
      <View className="flex-1 justify-center items-center">
        <Carousel
          width={width}
          height={width * 0.8}
          data={data}
          renderItem={renderItem}
          loop={true}
          autoPlay={true}
          autoPlayInterval={3000}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 60,
          }}
          onProgressChange={(_, absoluteProgress) => {
            progress.value = absoluteProgress;
          }}
        />

        {/* Pagination sử dụng Animated Component */}
        <View className="flex-row mt-8 justify-center items-center">
          {data.map((_, i) => (
            <PaginationItem key={i} index={i} progress={progress} />
          ))}
        </View>
      </View>
      <View className="px-6 flex gap-2">
        <Pressable
          onPress={() => handleChoose('teacher')}
          className="w-full  bg-red-700  p-5 rounded-full flex-row items-center justify-center gap-3"
        >
          <TeacherIcon />
          <Text className="text-white text-xl">
            Tôi là giáo viên
          </Text>
        </Pressable>


        <Pressable
          onPress={() => handleChoose('parent')}
          className="w-full bg-white p-5 rounded-full flex-row items-center justify-center gap-3"
        >
          <ParentIcon />
          <Text className="text-[#334155] text-xl">
            Tôi là phụ huynh
          </Text>
        </Pressable>
      </View >
    </View >
  );
}