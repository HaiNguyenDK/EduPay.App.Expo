import Layout from "@/components/ui/layouts/layout";
import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, Animated, ScrollView, KeyboardAvoidingView, Platform, useWindowDimensions, Image } from "react-native"
import { IUserData } from "./search-student";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ItemIcon from "../../assets/icons/Line.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import DownArrow from "../../assets/icons/down-arrow.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import CoinIcon from "../../assets/icons/coin.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import NoteIcon from "../../assets/icons/note.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import Tem from "../../assets/icons/tem.svg";
import Svg, { Path } from "react-native-svg";
import { router } from "expo-router";
import Footer from "@/components/ui/layouts/footer";

const tabs = ["Tất cả", "Chưa đóng", "Đang đóng", "Đã đóng"];
const billData = [
  {
    id: 1,
    title: "Phiếu thu kỳ 01 - 2023",
    desc: "Học phí",
    total: 1500000,
    status: "Chưa đóng"
  },
  {
    id: 2,
    title: "Phiếu thu kỳ 02 - 2023",
    desc: "Học phí",
    total: 1400000,
    status: "Đang đóng"
  },
  {
    id: 3,
    title: "Phiếu thu kỳ 03 - 2023",
    desc: "Học phí",
    total: 1300000,
    status: "Đã đóng"
  },
  {
    id: 4,
    title: "Phiếu thu kỳ 04 - 2023",
    desc: "Học phí",
    total: 15600000,
    status: "Đã đóng"
  },
]

const TemIcon = ({ color = "#000" }) => (
  <Svg width="17" height="20" viewBox="0 0 17 20" fill="none">
    <Path
      d="M16.5 1.67C16.5 1.66 16.5 1.65 16.48 1.64C16.26 1.36 15.97 1.21 15.63 1.21C15.1 1.21 14.46 1.56 13.77 2.3C12.95 3.18 11.69 3.11 10.97 2.15L9.96 0.81C9.56 0.27 9.03 0 8.5 0C7.97 0 7.44 0.27 7.04 0.81L6.02 2.16C5.31 3.11 4.06 3.18 3.24 2.31L3.23 2.3C2.1 1.09 1.09 0.91 0.52 1.64C0.5 1.65 0.5 1.66 0.5 1.67C0.14 2.44 0 3.52 0 5.04V14.96C0 16.48 0.14 17.56 0.5 18.33C0.5 18.34 0.51 18.36 0.52 18.37C1.1 19.09 2.1 18.91 3.23 17.7L3.24 17.69C4.06 16.82 5.31 16.89 6.02 17.84L7.04 19.19C7.44 19.73 7.97 20 8.5 20C9.03 20 9.56 19.73 9.96 19.19L10.97 17.85C11.69 16.89 12.95 16.82 13.77 17.7C14.46 18.44 15.1 18.79 15.63 18.79C15.97 18.79 16.26 18.65 16.48 18.37C16.49 18.36 16.5 18.34 16.5 18.33C16.86 17.56 17 16.48 17 14.96V5.04C17 3.52 16.86 2.44 16.5 1.67ZM11 12.5H5C4.59 12.5 4.25 12.16 4.25 11.75C4.25 11.34 4.59 11 5 11H11C11.41 11 11.75 11.34 11.75 11.75C11.75 12.16 11.41 12.5 11 12.5ZM13 9H5C4.59 9 4.25 8.66 4.25 8.25C4.25 7.84 4.59 7.5 5 7.5H13C13.41 7.5 13.75 7.84 13.75 8.25C13.75 8.66 13.41 9 13 9Z"
      fill={color}
    />
  </Svg>
);

const ListBill = () => {
  const [student, setStudent] = useState<IUserData | null>();
  const [active, setActive] = useState(0);
  const indicator = useRef(new Animated.Value(0)).current;
  const width = useWindowDimensions().width;
  console.log(width);

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('student');
        // console.log(jsonValue);
        if (jsonValue != null) {
          setStudent(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadStudent();
  }, []);

  const TAB_WIDTH = 90;

  const handlePress = (index: number) => {
    setActive(index);

    Animated.spring(indicator, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  return (
    <Layout>
      <>
        <View className="flex flex-col gap-4 mt-8">
          <View className="flex flex-col gap-4">
            <Pressable className=" flex flex-row justify-between items-center
                      border border-[#CFD8E1] rounded-2xl px-4 py-3"
            // onPress={() => router.push("/parent-screen/search-student")}
            >
              <View className="flex flex-col justify-start items-start">
                <View className="flex flex-row justify-center items-center">
                  <ItemIcon />
                  <Text className="font-medium text-sm text-neutral-600">{student?.school}</Text>
                </View>
                <Text className="text-xl text-[#334155] font-bold font-roboto">{student?.name}</Text>
              </View>
              <View className="w-11 h-11 border shadow-slate-400 border-neutral-200 rounded-xl
                      flex justify-center items-center">
                <DownArrow />
              </View>
            </Pressable>
          </View>

          <View className="border-b border-gray-200 mt-4">
            <View className="flex flex-row gap-6 justify-around">
              {tabs.map((item, index) => (
                <Pressable key={index} onPress={() => handlePress(index)}>
                  <View className="items-center w-[70px]">
                    <Text
                      className={`text-base font-semibold ${active === index ? "text-red-500" : "text-gray-600"
                        }`}
                    >
                      {item}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>

            <Animated.View
              className="h-[4px] w-[70px] bg-red-500 rounded-t-full mt-1 "
              style={{
                transform: [{ translateX: indicator }],
              }}
            />
          </View>
        </View>

        <View className="flex flex-1 mt-4">
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "padding"} // iOS: padding, Android: height
            keyboardVerticalOffset={Platform.OS === "ios" ? 160 : 160} // điều chỉnh offset nếu cần
            className="mb-[130px] mt-5"
          >
            <ScrollView
              className="px-2"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
              keyboardShouldPersistTaps="handled"
            >
              <View className="flex flex-col gap-4">
                {billData.length > 0 ?
                  billData.map((item, index) => (
                    <View key={index} className="border border-[#E2E8F0] p-4 rounded-3xl flex flex-col gap-4">
                      <View className=" flex flex-row gap-3">
                        <View className={`px-4 flex justify-center items-center
                      ${item.status === "Chưa đóng" ? "bg-[#f7d6c6]" : item.status === "Đã đóng" ? "bg-[#F5FAF8]" : "bg-[#F0F5FF]"}
                      rounded-2xl`}
                        >
                          <TemIcon
                            color={
                              item.status === "Chưa đóng"
                                ? "#F6662D"
                                : item.status === "Đã đóng"
                                  ? "#0C793F" : "#2787FF"}
                          />
                        </View>

                        <View className="flex flex-col gap-1">
                          <View className={`flex flex-row justify-between items-center gap-8`}>
                            <Text className="font-roboto text-base text-neutral-500">{item?.title}</Text>
                            <View className="flex flex-row justify-center items-center gap-2">
                              <View className={`w-1 h-1 rounded-full 
                               ${item.status === "Chưa đóng" ? "bg-[#F6662D]" : item.status === "Đã đóng" ? "bg-[#0C793F]" : "bg-[#2787FF]"}`} />
                              <Text className={`font-roboto text-sm font-bold 
                              ${item.status === "Chưa đóng" ? "text-[#F6662D]" : item.status === "Đã đóng" ? "text-[#0C793F]" : "text-[#2787FF]"}`}>
                                {item?.status}
                              </Text>
                            </View>
                          </View>
                          <Text className="font-roboto text-xl font-bold text-neutral-800">{formatNumber(item?.total || 0)} đ</Text>
                        </View>
                      </View>

                      <View className="flex flex-row justify-between items-center w-full gap-4">
                        <Pressable className="flex flex-row border border-[#EA3E3E] rounded-3xl px-4 py-2 gap-1"
                          onPress={() => router.push({
                            pathname: "/parent-screen/bill/detail-bill",
                            params: { id: item?.id },
                          })}
                        >
                          <NoteIcon />
                          <Text className="text-[#EA3E3E] font-bold font-roboto">Xem phiếu thu</Text>
                        </Pressable>
                        <Pressable className={`flex-1 flex-row 
                      ${item.status === "Đã đóng" ? "bg-neutral-400" : "bg-[#EA3E3E]"} rounded-3xl px-4 py-2 gap-1 justify-center`}
                          disabled={item.status === "Đã đóng" ? true : false}
                          onPress={() => router.push({
                            pathname: "/parent-screen/bill/detail-bill",
                            params: { id: item?.id },
                          })}>
                          <CoinIcon />
                          <Text className="text-white font-bold font-roboto">Đóng tiền</Text>
                        </Pressable>
                      </View>
                    </View>
                  )) : (
                    <View className="flex flex-col gap-1 justify-center items-center">
                      <Image source={require("../../assets/images/nodata.jpg")} />
                      <Text className="font-roboto text-2xl font-bold text-neutral-700">Chưa có phiếu thu</Text>
                      <Text className="text-center font-roboto text-xl text-neutral-400">Hiện tại nhà trường chưa tạo phiếu thu cho học sinh</Text>
                    </View>
                  )}
              </View>

            </ScrollView>
          </KeyboardAvoidingView>
        </View>

        {/* Footer */}
        <Footer>
          <Pressable className="flex-1 border-2 border-[#CFD8E1] p-4 rounded-full "
            onPress={() => router.back()}
          >
            <Text className="text-center text-sm font-medium text-neutral-900">
              Quay Lại
            </Text>
          </Pressable>
        </Footer>
      </>

    </Layout >
  );
}

export default ListBill;