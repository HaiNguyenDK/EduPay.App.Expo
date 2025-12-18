import Layout from "@/components/ui/layouts/layout"
import React, { useState } from "react";
import { View, Image, Text, Pressable } from "react-native";
import { TemIcon } from "../icon";
import Footer from "@/components/ui/layouts/footer";
import { router } from "expo-router";
import { packagePaymentData } from "../data";
import Toast from "react-native-toast-message";

const PackagePayment = () => {
  const [packagePayment, setPackagePayment] = useState<any>();

  const handleSubmit = () => {
    if (!packagePayment) {
      Toast.show({
        type: 'error',
        text1: 'Vui lòng chọn gói đóng',
      })
      return;
      // router.push("/parent-screen/bill/package-payment-success");
    } else {
      router.push({
        pathname: "/parent-screen/bill/package-payment-type",
        params: { item: JSON.stringify(packagePayment) },
      });
    }
  }

  return (
    <Layout>
      <View className="flex flex-col gap-4 mt-4">
        <View className="flex flex-row gap-8">
          <Image source={require("../../../assets/images/blingbling.png")} />
          <Text className="text-xl font-bold text-[#334155]">Chọn gói đóng</Text>
        </View>

        <View className="flex flex-col gap-4">
          {packagePaymentData?.map((item, index) => (
            <Pressable key={index}
              className={`flex flex-row items-center gap-3 border border-neutral-200 rounded-3xl p-4
                 ${packagePayment?.id === item.id ? "bg-[#f7d6c6]" : ""}`}
              onPress={() => setPackagePayment(item)}
            >
              <View className={`p-4 flex justify-center items-center bg-[#f7d6c6] rounded-2xl`}>
                <TemIcon
                  color={"#F6662D"}
                />
              </View>
              <View>
                <Text className="text-xs text-neutral-500">Đóng {index + 1} đợt</Text>
                <Text className="text-xl text-neutral-700">44.398.345 đ</Text>
              </View>
            </Pressable>
          ))}


          {/* <Pressable className="flex flex-row items-center gap-3 border border-neutral-200 rounded-3xl p-4"
            onPress={() => { }}>
            <View className={`p-4 flex justify-center items-center bg-[#f7d6c6] rounded-2xl`}>
              <TemIcon
                color={"#F6662D"}
              />
            </View>
            <View>
              <Text className="text-xs text-neutral-500">Đóng 02 đợt</Text>
              <Text className="text-xl text-neutral-700">44.398.345 đ</Text>
            </View>
          </Pressable> */}
        </View>
      </View>

      <Footer>
        <Pressable className="flex-1 border border-[#CFD8E1] p-4 rounded-full"
          onPress={() => router.back()}
        >
          <Text className="text-center text-sm font-medium text-neutral-900">
            Quay Lại
          </Text>
        </Pressable>
        <Pressable className="flex-1 p-4 bg-[#EA3E3E] rounded-full"
          onPress={() => handleSubmit()}
        >
          <Text className="text-center text-sm font-medium text-white">
            Xác nhận
          </Text>
        </Pressable>
      </Footer>
    </Layout>
  )
}

export default PackagePayment;