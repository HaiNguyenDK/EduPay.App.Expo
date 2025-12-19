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

  const [QRstatus, setQRstatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formatNumber = (num: number) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  const handleReloadQR = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    if (QRstatus) {
      Toast.show({
        type: "success",
        text1: "Thanh toán thành công",
      })
      const time = setTimeout(() => {
        console.log("Thanh toán thành công");
        router.push({
          pathname: "/parent-screen/bill/payment-result",
          params: { item: JSON.stringify(parsedItem) },
        });
      }, 3000);
      return () => clearTimeout(time);
    }
  }, [QRstatus]);

  useEffect(() => {
    if (isLoading) {
      const time = setTimeout(() => {
        setQRstatus(true);
        setIsLoading(false);
      }, 3000);
      return () => clearTimeout(time);
    }
  }, [isLoading]);

  const expireTime = new Date(Date.now() + 5 * 60 * 1000);

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
            <View className="flex flex-row gap-8">
              <Image source={require("../../../assets/images/blingbling.png")} />
              <Text className="text-xl font-bold text-[#334155]">Thanh toán</Text>
            </View>

            <View className="flex items-center gap-4">
              {QRstatus ? (
                <View className="flex items-center gap-4">
                  <Image source={require("../../../assets/images/QR.jpg")} />
                  <Text className="font-bold text-[#EA3E3E]">QR hết hạn lúc {expireTime.toLocaleTimeString() + " " + expireTime.toLocaleDateString()}</Text>
                  <View className="flex flex-row justify-between gap-2">
                    <Pressable className="flex flex-row items-center gap-2 border border-gray-300 rounded-3xl px-4 py-2">
                      <DowloadIcon />
                      <Text className="font-medium text-neutral-900">Lưu mã QR</Text>
                    </Pressable>
                    <Pressable className="border border-gray-300 rounded-3xl px-4 py-2">
                      <Text className="font-medium text-neutral-900">Kiểm tra thanh toán</Text>
                    </Pressable>
                  </View>
                  {true ? (
                    <Text className="text-sm text-center text-neutral-500">
                      Nếu đã thanh toán nhưng hệ thống không tự cập nhật, {`\n`}hãy nhấn "Kiểm tra thanh toán"
                    </Text>
                  ) : (
                    <View className="flex flex-row items-center gap-2 border border-gray-300 rounded-3xl px-4 py-3">
                      <Text className="font-bold text-[#334155]">EduPay chưa ghi nhận giao dịch!</Text>
                      <Text className="h-full border-r border-neutral-400"></Text>
                      <View className="flex flex-row items-center gap-2">
                        <ZaloIcon />
                        <Text className="font-bold text-[#2B61E8]">CSKH hỗ trợ</Text>
                      </View>
                    </View>
                  )}
                </View>
              ) : (
                <View className="flex items-center gap-4">
                  <Image source={require("../../../assets/images/result-warning-error.jpg")} />
                  <Text className="font-bold text-[#EA3E3E] text-center">Có lỗi trong quá trình tạo QR, {"\n"}vui lòng bấm nút tải lại mã QR mới</Text>
                  <View className="flex flex-row justify-between gap-2">
                    <Pressable className="flex flex-row items-center gap-2 border border-gray-300 rounded-full px-4 py-3">
                      <ZaloIcon />
                      <Text className="font-medium text-neutral-900">Hỗ trợ nhanh</Text>
                    </Pressable>

                    <Pressable className="flex flex-row items-center gap-2 border border-gray-300 rounded-full px-4 py-3"
                      onPress={handleReloadQR}>
                      <ReplayIcon />
                      <Text className="font-medium text-neutral-900">Tạo lại mã QR</Text>
                    </Pressable>
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

              <Text>Mở App ngân hàng sau khi lưu mã QR</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
              >
                <View className="flex flex-row justify-between items-center gap-4 overflow-hidden">
                  {ListBankLogo.map((item, index) => (
                    <View key={index} className="w-16 h-16 flex justify-center overflow-hidden items-center border border-neutral-400 rounded-2xl">
                      <Image className="p-4 object-cover" key={index} source={item.url}
                        resizeMode="contain" />
                    </View>
                  ))}
                  {ListBankLogo.map((item, index) => (
                    <View key={index} className="w-16 h-16 flex justify-center overflow-hidden items-center border border-neutral-400 rounded-2xl">
                      <Image className="p-4" key={index} source={item.url}
                        resizeMode="contain" />
                    </View>
                  ))}
                  <View className="w-16 h-16 flex justify-center items-center border border-neutral-400 rounded-2xl">
                    <Text className="text-neutral-400 text-center">Xem thêm</Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Footer title="Bằng cách thanh toán, bạn đồng ý với các điều khoản và chính sách này của EduPay ">
        {QRstatus ? (
          <Pressable className="flex-1 border border-[#CFD8E1] p-4 rounded-full"
            onPress={() => router.back()}
          >
            <Text className="text-center text-sm font-medium text-neutral-900">
              Quay Lại
            </Text>
          </Pressable>
        ) : (
          <Pressable className="flex-1 border border-[#EA3E3E] p-4 rounded-full"
            onPress={() => handleReloadQR()}
          >
            <Text className="text-center text-sm font-medium text-[#EA3E3E]">
              Thử lại
            </Text>
          </Pressable>
        )}
      </Footer>
      <LoadingModal visible={isLoading} />
    </Layout >
  )
}

export default PaymentDetail;