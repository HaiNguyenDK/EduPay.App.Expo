import Header from "@/components/ui/Header";
import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import EyesIcon from "../../assets/icons/open-eyes.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import HideEyesIcon from "../../assets/icons/hide-eyes.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import FaceScanIcon from "../../assets/icons/face-scan.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import LockIcon from "../../assets/icons/lock.svg";
import CustomButton from "@/components/ui/Button";
import { useRouter } from "expo-router";
import FaceIDModal from "@/components/ui/modals/FaceIDModal";

const Account = {
  phone: "0337948102",
  password: "123456",
}

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showFaceID, setShowFaceID] = useState(false);
  const router = useRouter();

  const handleChangePhone = (text: string) => {
    // Chỉ giữ số và limit 10 ký tự
    const numeric = text.replace(/[^0-9]/g, "").slice(0, 10);
    setPhone(numeric);
  };

  const validatePhone = () => {
    const phoneRegex = /^0\d{9}$/;

    if (!phoneRegex.test(phone)) {
      setError("Số điện thoại không hợp lệ");
    } else {
      setError("");
    }
  };

  const handeLogin = () => {
    if (phone === "" || password === "") {
      setError("Vui lòng nhập số điện thoại và mật khẩu");
      return;
    }

    if (phone === Account.phone && password === Account.password) {
      setError("")
      router.push("/(tabs)");
    } else if (phone == Account.phone && password !== Account.password) {
      setError("Mật khẩu không đúng");
    } else if (phone !== Account.phone && password == Account.password) {
      setError("Số điện thoại không đúng");
    } else {
      setError("Số điện thoại và mật khẩu không đúng");
    }
  }

  return (
    <View className="flex-1">
      <Header />
      {/* Body */}
      <View className="px-6 flex-col gap-6">
        <Text className="text-2xl font-bold text-center mt-8">
          Đăng nhập để sử dụng {"\n"} tiện ích EduPay
        </Text>
        {/* Input */}
        <View className=" text-base mt-4">
          {/* phone */}
          <View className="w-full flex-row items-center border border-[#CFD8E1] rounded-2xl px-4 h-16 ">
            <TextInput
              className="flex-1 text-base text-[#334155]"
              value={phone}
              onChangeText={handleChangePhone}
              onBlur={validatePhone}
              keyboardType="numeric"
              placeholder="Nhập số điện thoại"
              placeholderTextColor="#A8B4C2"
            />
            <Pressable onPress={() => setShowFaceID(true)}>
              <FaceScanIcon width={30} height={30} />
            </Pressable>
          </View>
          {/* password */}
          <View className="w-full flex-row items-center border border-[#CFD8E1] rounded-2xl px-4 h-16  mt-4">
            <TextInput
              className="flex-1 text-base text-[#334155]"
              placeholder="Nhập mật khẩu"
              placeholderTextColor="#A8B4C2"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!showPassword}
            />

            {/* Icon con mắt */}
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <HideEyesIcon width={25} height={22} />
              ) : (
                <EyesIcon />
              )}
            </Pressable>
          </View>
        </View>
        {/* Error */}
        <View>
          {error ? (
            <Text className="text-red-500 font-roboto text-sm text-center">{error}</Text>
          ) : null}
        </View>
        {/* Button */}
        <View className="flex-row justify-around gap-4">
          <View className="flex-1">
            <CustomButton
              title="Đăng ký"
              textColor="text-[#EA3E3E]"
              backgroundColor="bg-white"
              borderColor="border-[#EA3E3E]"
              onPress={() => {
                router.push("/(auth)/register/phone");
              }}
            />
          </View>
          <View className="flex-1">
            <CustomButton
              title="Đăng nhập"
              onPress={() => handeLogin()}
            />
          </View>
        </View>
        {/* Fogot password */}
        <View className="flex-row gap-5 align-middle justify-center text-center">
          <LockIcon />
          <Text className="text-[#64748B] font-roboto text-base">
            Quên mật khẩu ?
          </Text>
        </View>
      </View>
      <FaceIDModal
        visible={showFaceID}
        onClose={() => setShowFaceID(false)}
        title="Kích hoạt đăng nhập bằng FaceID"
      />
    </View>
  )
}