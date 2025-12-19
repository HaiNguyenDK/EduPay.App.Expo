import FullScreenLayout from "@/components/ui/layouts/fullScreenLayout";
import { View, Text, Pressable } from "react-native";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ItemIcon from "../../../assets/icons/Line.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import DownArrow from "../../../assets/icons/down-arrow.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import CoinIcon from "../../../assets/icons/coin.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import NoteIcon from "../../../assets/icons/note.svg";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUserData } from "../search-student";
import Footer from "@/components/ui/layouts/footer";
import { router, useLocalSearchParams } from "expo-router";
import { PackagePayment } from "@/types/models/package";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)

const DetailBill = () => {
  const [student, setStudent] = useState<IUserData | null>();
  const { item } = useLocalSearchParams();
  const [currentItem, setCurrentItem] = useState<PackagePayment>();

  useEffect(() => {
    if (!item) return;

    const parsedItem = JSON.parse(item as string) as PackagePayment;
    setCurrentItem(parsedItem);

  }, [item]);


  useEffect(() => {
    const loadStudent = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('student');
        console.log(jsonValue);
        if (jsonValue != null) {
          setStudent(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadStudent();
  }, []);
  return (
    <>
      <FullScreenLayout title="Chi tiết phiếu thu" >
        <View>
          <View className="flex flex-col gap-4">
            <View className=" flex flex-row justify-between items-center
                              border border-[#CFD8E1] rounded-2xl px-8 py-4 mx-2"
            // onPress={() => router.push("/parent-screen/search-student")}
            >
              <View className="flex flex-col justify-start items-start">
                <View className="flex flex-row justify-center items-center">
                  <ItemIcon />
                  <Text className="font-medium text-sm text-neutral-600">{student?.school}</Text>
                </View>
                <Text className="text-xl text-[#334155] font-bold font-roboto">{student?.name}</Text>
              </View>
            </View>

            <View className="px-4 py-4 flex flex-col gap-2 border border-neutral-200 rounded-2xl">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-base font-bold font-roboto text-neutral-700">Mã phiếu thu</Text>
                <Text className="text-base font-roboto text-neutral-700">ABJSWJ!#!</Text>
              </View>
              <View className="flex flex-row justify-between items-center">
                <Text className="text-base font-bold font-roboto text-neutral-700">Ngày</Text>
                <Text className="text-base font-roboto text-neutral-700">8:00AM - 12/11/2025</Text>
              </View>
            </View>

            {/* Chi tiết thanh toán */}
            <Text>Chi tiết thanh toán</Text>
            <View className="flex flex-col gap-2 p-4 border border-neutral-200 rounded-2xl">
              <View className="flex flex-row justify-between items-center">
                <Text className="font-roboto font-bold text-neutral-700">Học phí tháng 08/2024</Text>
                <Text className="font-roboto font-bold text-neutral-700">43.000.000đ</Text>
              </View>
              <View className="pl-3 flex flex-row justify-between items-center">
                <Text className="font-roboto text-[#40D36A]" >Miễn giảm</Text>
                <Text className="font-roboto text-[#00A757] font-bold">-1.500.000đ</Text>
              </View>
              <View className="w-full border-b border-neutral-200 "></View>
              <View className="flex flex-row justify-between items-center">
                <Text>Cộng sau miễn giảm </Text>
                <Text className="font-roboto text-neutral-700 font-bold">41.500.000đ</Text>
              </View>
              <View className="flex flex-row justify-between items-center">
                <Text>VAT(8%)</Text>
                <Text className="font-roboto text-neutral-700 font-bold">+3.320.000đ</Text>
              </View>
            </View>

            <View className="flex flex-col gap-2 p-4 border border-neutral-200 rounded-2xl">
              <View className="flex flex-row justify-between items-center">
                <Text className="font-roboto font-bold text-neutral-700">Học phí tháng 08/2024</Text>
                <Text className="font-roboto font-bold text-neutral-700">500.000đ</Text>
              </View>
              <Text className="text-neutral-400 pl-3 font-roboto">(Không chịu thuế)</Text>
            </View>

            {/* Giáo trình và tài liệu */}
            <View className="flex flex-col gap-2 p-4 border border-neutral-200 rounded-2xl">
              <View className="flex flex-row justify-between items-center">
                <Text className="font-roboto font-bold text-neutral-700">Giáo trình & Tài liệu</Text>
                <Text className="font-roboto font-bold text-neutral-700">350.000đ</Text>
              </View>
              <View className="pl-3 flex flex-row justify-between items-center">
                <Text className="font-roboto text-[#40D36A]" >Miễn giảm</Text>
                <Text className="font-roboto text-[#00A757] font-bold">-50.000đ</Text>
              </View>
              <View className="w-full border-b border-neutral-200 "></View>
              <View className="flex flex-row justify-between items-center">
                <Text>Cộng sau miễn giảm </Text>
                <Text className="font-roboto text-neutral-700 font-bold">300.000đ</Text>
              </View>
              <View className="flex flex-row justify-between items-center">
                <Text>VAT(5%)</Text>
                <Text className="font-roboto text-neutral-700 font-bold">+15.000đ</Text>
              </View>
            </View>

            <View className="w-full border-b border-neutral-200 px-6"></View>
            <View className="px-4 flex flex-col gap-2">
              <View className="flex flex-row justify-between items-center">
                <Text className="font-roboto font-bold text-neutral-700">Tạm tính</Text>
                <Text className="font-roboto font-bold text-neutral-700">45.630.000đđ</Text>
              </View>
              <View className="flex flex-row justify-between items-center">
                <Text className="font-roboto text-[#40D36A]">Cấn trừ tiền ăn</Text>
                <Text className="font-roboto text-[#00A757] font-bold">-150.000đ</Text>
              </View>
            </View>
            <View className="border-b border-neutral-200 px-10"></View>

          </View>
        </View>
      </FullScreenLayout>
      <View className="px-4 pb-6 flex flex-col gap-4 bg-white">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-xl font-bold text-neutral-700">Tổng cộng </Text>
          <Text className="text-xl font-bold text-[#EA3E3E]">44.398.345 đ</Text>
        </View>
        <Pressable className={`flex flex-row bg-[#EA3E3E] rounded-3xl px-4 py-4 gap-1 justify-center`}
          onPress={() => router.push({
            pathname: "/parent-screen/bill/payment-detail",
            params: { item: JSON.stringify(currentItem) }
          })}
        >
          <CoinIcon />
          <Text className="text-white font-bold font-roboto">Đóng tiền</Text>
        </Pressable>
      </View >
    </>

  );
}

export default DetailBill;