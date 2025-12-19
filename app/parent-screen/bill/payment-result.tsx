import Layout from "@/components/ui/layouts/layout";
import { View, Image, Text, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { packagePaymentData } from "../data";
import { ListBankLogo, TemIcon } from "../icon";
import Footer from "@/components/ui/layouts/footer";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { PackagePayment } from "@/types/models/package";
import Toast from "react-native-toast-message";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import DowloadIcon from "../../../assets/icons/download.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ReplayIcon from "../../../assets/icons/replay.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ZaloIcon from "../../../assets/icons/zalo.svg";
import LoadingModal from "@/components/ui/modals/LoadingModal";


const PaymentDetail = () => {
  const { item } = useLocalSearchParams();
  const parsedItem = JSON.parse(item as string) as PackagePayment;

  const formatNumber = (num: number) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  return (
    <Layout>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"} // iOS: padding, Android: height
        keyboardVerticalOffset={Platform.OS === "ios" ? 160 : 160} // điều chỉnh offset nếu cần
        className="mb-[160px] mt-5"
      >
        <ScrollView
          className="px-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex flex-col gap-4 mt-2">
            <View className="flex items-center gap-8">
              {true ? (
                <View className="flex items-center gap-4">
                  <Image source={require("../../../assets/images/result-success.jpg")} />
                  <View className="flex flex-col justify-center">
                    <Text className="text-xl font-bold text-[#EA3E3E] text-center">Thanh toán thành công</Text>
                    <Text className="text-sm text-center">Đợt 1 (22/11/2023 - 23/11/2023)</Text>
                  </View>
                </View>
              ) : (
                <View className="flex items-center gap-4">
                  <Image source={require("../../../assets/images/result-fail.jpg")} />
                  <View className="flex flex-col justify-center">
                    <Text className="text-xl font-bold text-[#EA3E3E] text-center">Thanh toán thất bại</Text>
                    <Text className="text-sm text-center">Lỗi không xác định  </Text>
                  </View>

                </View>
              )}

              <View className="w-full flex flex-col gap-2 border border-gray-300 rounded-2xl px-4 py-4">
                <View className="flex flex-row justify-between">
                  <Text className="font-bold text-neutral-700">Tài khoản nhận</Text>
                  <Text className="text-neutral-700">Trường THPT Nghĩa Tân</Text>
                </View>
                <View className="flex flex-row justify-between">
                  <Text className="font-bold text-neutral-700">Ngân hàng</Text>
                  <Text className="text-neutral-700">HDBank</Text>
                </View>
                <View className="flex flex-row justify-between">
                  <Text className="font-bold text-neutral-700">Nội dung</Text>
                  <Text className="text-neutral-700">90248239</Text>
                </View>
                <View className="flex flex-row justify-between">
                  <Text className="font-bold text-neutral-700">Số tiền</Text>
                  <Text className="text-neutral-700 text-xl font-medium">{formatNumber(parsedItem?.price || 0)}đ</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Footer>
        {true ? (
          <Pressable className="flex-1 border border-[#EA3E3E] p-4 rounded-full"
            onPress={() => router.replace("/(parent-tabs)/home")}
          >
            <Text className="text-center text-base font-medium text-[#EA3E3E]">
              Về trang chủ
            </Text>
          </Pressable>
        ) : (
          <Pressable className="flex-1 border border-[#EA3E3E] p-4 rounded-full"
          // onPress={() => handleReloadQR()}
          >
            <Text className="text-center text-base font-medium text-[#EA3E3E]">
              Thử lại
            </Text>
          </Pressable>
        )}
      </Footer>
    </Layout >
  )
}

export default PaymentDetail;