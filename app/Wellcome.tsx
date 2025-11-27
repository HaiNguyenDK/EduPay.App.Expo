import React from "react";
import { View, Image, Dimensions, Text } from "react-native";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import EdupayLogo from "../assets/icons/EduPay-logo.svg";
import Carousel from "react-native-reanimated-carousel";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

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

  const renderItem = ({ item }: { item: any }) => (
    <View className="flex justify-center items-center px-6">
      <Image
        source={item.img}
        resizeMode="cover"
      />
      <Text>{item.title}</Text>
      <Text className="text-center">{item.desc}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header + Logo */}
      <View className="relative">
        <Image
          source={require("../assets/images/bg-school.jpg")}
          resizeMode="cover"
          className="w-full"
        />
        <View className="absolute inset-0 justify-center items-center">
          <EdupayLogo />
        </View>
      </View>

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
    </View>
  );
}