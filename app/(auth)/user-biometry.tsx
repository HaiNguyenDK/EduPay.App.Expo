import CustomButton from "@/components/ui/Button";
import Layout from "@/components/ui/layouts/layout";
import { useRouter } from "expo-router";
import { View, Text, Image } from "react-native";

const data = [
  {
    id: 1,
    title: "Quét mã MRZ với Camera",
    sub: "Quét mã MRZ trên mặt sau của CCCD để xác thực thông tin",
    img: require("../../assets/images/user-scanMRZ.png")
  },
  {
    id: 2,
    title: "Xác thực khuôn mặt",
    sub: "Xác thực khuôn mặt với AI",
    img: require("../../assets/images/user-scan-face.png")
  },
  {
    id: 3,
    title: "Kiểm tra thông tin",
    sub: "Xác nhận thông tin của bạn",
    img: require("../../assets/images/user-check-infor.png")
  },
]

export default function UserBiometryScreen() {
  const router = useRouter();
  return (
    <Layout
      title={`Xác thực thông tin\n người dùng`}
      backButton={true}
    >
      <View className=" text-base mt-4 flex-col gap-10">
        <View className="flex-col gap-4">
          {data.map((item) => (
            <View
              key={item.id}
              className="flex-row justify-center items-center gap-6"
            >
              <Image
                source={item.img}
                resizeMode="cover"
                className="border border-[#E2E8F0] rounded-3xl"
              />
              <View className="flex-1">
                <Text className="text-lg font-bold">{item.title}</Text>
                <Text className="text-sm text-[#64748B]">{item.sub}</Text>
              </View>

            </View>
          ))}
        </View>

        {/* Button */}
        <View className="flex-row justify-around gap-4">
          <View className="flex-1">
            <CustomButton
              title="Bỏ qua"
              textColor="text-[#EA3E3E]"
              backgroundColor="bg-white"
              borderColor="border-[#EA3E3E]"
              onPress={() => router.back()}
            />
          </View>
          <View className="flex-1">
            <CustomButton
              title="Xác thực"
              onPress={() => router.push("/(auth)/user-infor")}
            />
          </View>
        </View>
      </View>
    </Layout >
  )
}