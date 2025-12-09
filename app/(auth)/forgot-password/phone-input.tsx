import CustomButton from "@/components/ui/Button";
import Layout from "@/components/ui/layouts/layout";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { Account } from "../login";
import { IRegister } from "@/types/models/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FPPhone() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChangePhone = (text: string) => {
    // Chỉ giữ số và limit 10 ký tự
    const numeric = text.replace(/[^0-9]/g, "").slice(0, 10);
    setPhone(numeric);
  };

  const handeLogin = async () => {
    if (phone === "") {
      setError("Vui lòng nhập số điện thoại");
      return;
    }

    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone) || phone.length !== 10) {
      setError("Số điện thoại không hợp lệ");
      return;
    }

    if (phone === Account.phone) {
      setError("Tài khoản đã tồn tại!")
      return;
    }

    setError("")
    await AsyncStorage.setItem("phone", phone);
    router.push({
      pathname: "/(auth)/forgot-password/otp-fp",
    });
  }

  return (
    <Layout title="Quên mật khẩu"
      sub={"Nhập số điện thoại bạn dùng để đăng ký tài khoản. \nChúng tôi sẽ gửi mã OTP đến số điện thoại này."}
    >
      <View className=" text-base mt-4 flex-col gap-4">
        {/* phone */}
        <View className={`w-full flex-row items-center border border-[#CFD8E1] rounded-2xl px-4 h-16 ${error ? "border-red-500" : ""}`}>
          <TextInput
            className="flex-1 text-base text-[#334155]"
            value={phone}
            onChangeText={handleChangePhone}
            keyboardType="numeric"
            placeholder="Nhập số điện thoại"
            placeholderTextColor="#A8B4C2"
          />
        </View>
        {/* Error */}
        <View>
          {error ? (
            <Text
              className="text-red-500 font-roboto text-sm text-center py-2 rounded-full bg-[#EF44441A]">
              {error}
            </Text>
          ) : null}
        </View>
        {/* Button */}
        <View className="flex-row justify-around gap-4">
          <View className="flex-1">
            <CustomButton
              title="Quay về"
              textColor="text-[#EA3E3E]"
              backgroundColor="bg-white"
              borderColor="border-[#EA3E3E]"
              onPress={() => router.back()}
            />
          </View>
          <View className="flex-1">
            <CustomButton
              title="Xác nhận"
              onPress={handeLogin}
            />
          </View>
        </View>
      </View>
    </ Layout >
  )
}