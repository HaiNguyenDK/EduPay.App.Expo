import Layout from "@/components/ui/layouts/layout";
import { View, Image, Text, Pressable } from "react-native";
import { packagePaymentData } from "../data";
import { TemIcon } from "../icon";
import Footer from "@/components/ui/layouts/footer";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { PackagePayment } from "@/types/models/package";
import Toast from "react-native-toast-message";
import Slider from "@react-native-community/slider";


const PaymentType = () => {
  const { item } = useLocalSearchParams();
  // const [checked, setChecked] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<PackagePayment>();
  const [checkedPackage, setCheckedPackage] = useState<any>();
  const [amoutPay, setAmoutPay] = useState<any[]>([]);

  useEffect(() => {
    if (!item) return;

    const parsedItem = JSON.parse(item as string) as PackagePayment;
    setCurrentItem(parsedItem);
    const count = parsedItem.count || 1;
    const pricePerItem = parsedItem.price / count;

    const result: PackagePayment[] = Array.from(
      { length: count },
      (_, index) => ({
        ...parsedItem,
        id: `${parsedItem.id}-${index + 1}`,
        price: pricePerItem,
      })
    );

    setAmoutPay(result);
  }, [item]);

  const formatNumber = (num: number) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  const handleSubmit = () => {
    if (!checkedPackage) {
      Toast.show({
        type: 'error',
        text1: 'Vui lòng chọn gói đóng',
      })
      return;
    } else {
      router.push({
        pathname: "/parent-screen/bill/package-payment-type",
        params: { item: JSON.stringify(checkedPackage) },
      });
    }
  }

  const percent = currentItem?.price && currentItem?.count
    ? ((currentItem.price / currentItem.count) / currentItem.price) * 100
    : 10;

  return (
    <Layout>
      <View className="flex flex-col gap-4 mt-4">
        <View className="flex flex-row gap-8">
          <Image source={require("../../../assets/images/blingbling.png")} />
          <Text className="text-xl font-bold text-[#334155]">Danh sách các đợt đóng</Text>
        </View>

        <View>
          <Text className="text-neutral-500">Tổng số tiền cần đóng </Text>
          <Text className="text-xl text-neutral-700 font-semibold">0đ / {formatNumber(currentItem?.price || 0)} đ</Text>
          <View className="w-full flex flex-row items-center justify-center align-middle gap-4 px-4">
            {/* Track */}
            <View className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
              {/* Fill */}
              <View
                className="h-full bg-[#EA3E3E]"
                style={{ width: `${Math.min(percent, 100)}%` }}
              />
            </View>

            <Text className=" text-sm text-gray-600">
              {Math.round(percent)}%
            </Text>
          </View>

        </View>

        <View className="flex flex-col gap-4">
          {amoutPay?.map((item, index) => (
            <Pressable key={index}
              className={`flex flex-row items-center justify-between gap-3 border border-neutral-200 rounded-3xl px-4 py-2`}
              onPress={() => setCheckedPackage(item)}
            >
              <View className="flex flex-row items-center gap-3">
                <View className={`p-4 flex justify-center items-center bg-[#f7d6c6] rounded-2xl`}>
                  <TemIcon
                    color={"#F6662D"}
                  />
                </View>
                <View>
                  <View className="flex flex-row justify-center items-center gap-2">
                    <View className={`w-1 h-1 rounded-full bg-[#F6662D]`} />
                    <Text className={`font-roboto text-sm font-bold text-[#F6662D]`}>
                      Chưa đóng
                    </Text>
                  </View>
                  <Text className="text-sm text-neutral-500">Đóng {index + 1} đợt</Text>
                  <Text className="text-xl font-bold text-neutral-700">{formatNumber(item.price)}đ</Text>
                </View>
              </View>
              <View>
                <Pressable
                  onPress={() => setCheckedPackage(item)}
                  className={`w-6 h-6 rounded-md border-2 items-center justify-center
                   ${checkedPackage?.id === item.id ? "bg-gray-900 border-gray-900" : "border-gray-300"}`}
                >
                  {checkedPackage?.id === item.id && <Text className="text-white text-sm">✓</Text>}
                </Pressable>
              </View>

            </Pressable>
          ))}
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
    </Layout >
  )
}

export default PaymentType;