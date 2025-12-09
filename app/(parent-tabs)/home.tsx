import Layout from "@/components/ui/layouts/layout";
import { View, Text, Image, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import SearchIcon from "../../assets/icons/search-normal.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ItemIcon from "../../assets/icons/Line.svg";
import { router } from "expo-router";

const HomeParent = () => {
  return (
    <Layout bgColor="bg-[#F6F6F6]">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"} // iOS: padding, Android: height
        keyboardVerticalOffset={Platform.OS === "ios" ? 160 : 160} // điều chỉnh offset nếu cần
        className="mb-[130px] mt-5"
      >
        <ScrollView className="px-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-col gap-4">
            <View className="flex flex-row gap-5">
              <Image source={require("../../assets/images/Exclude.png")} />
              <View className="flex flex-col gap-2">
                <Text className="font-semibold text-sm">Thông tin của bạn chưa có dữ liệu tại hệ thống EduPay</Text>
                <Text className="text-xs text-neutral-500">Trường đã liên kết nhưng vẫn không có thông tin phụ huynh,{"\n"} vui lòng báo giáo viên cập nhật lại số điện thoại.</Text>
              </View>
            </View>

            <View className="flex flex-row gap-8">
              <Image source={require("../../assets/images/blingbling.png")} />
              <Text className="text-xl font-bold text-[#334155]">Tra cứu trường đã liên kết</Text>
            </View>

            <View className="w-full flex-row items-center align-middle border border-[#CFD8E1] rounded-full px-4 h-16 gap-2">
              <Pressable onPress={() => console.log("Scan")}>
                <SearchIcon />
              </Pressable>
              <TextInput
                className="flex-1 text-base text-[#334155]"
                // value={phone}
                // onChangeText={handleChangePhone}
                // onBlur={validatePhone}
                keyboardType="numeric"
                placeholder="Nhập tên trường, quận, thành phố"
                placeholderTextColor="#A8B4C2"
              />
            </View>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <Pressable key={item} className="flex flex-row justify-start items-center gap-3
                border border-[#CFD8E1] rounded-2xl px-4 py-3"
                onPress={() => router.push("/parent-screen/search-student")}
              >
                <ItemIcon />
                <View>
                  <Text className="font-medium text-sm text-[#252B37]">Trường mầm non Vườn Yêu Thương</Text>
                  <Text className="text-xs text-neutral-500">123 Đường An Dương Vương, Quận 5, TP.HCM</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout >
  );
};

export default HomeParent;