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
import { billData } from "./data";
import { TemIcon } from "./icon";

const tabs = ["Tất cả", "Chưa đóng", "Đang đóng", "Đã đóng"];

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
                {billData?.length > 0 ?
                  billData?.map((item, index) => (
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
                            pathname: "/parent-screen/bill/package-payment",
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