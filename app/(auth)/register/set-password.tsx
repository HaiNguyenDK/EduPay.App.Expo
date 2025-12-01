import CustomButton from "@/components/ui/Button";
import Layout from "@/components/ui/layouts/layout";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import EyesIcon from "../../../assets/icons/open-eyes.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import HideEyesIcon from "../../../assets/icons/hide-eyes.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import SuccessIconGray from "../../../assets/icons/succes-gray.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import SuccessIconGreen from "../../../assets/icons/succes-green.svg";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SetPassword() {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const router = useRouter();

  const validatePassword = [
    {
      name: "ít nhất 6 ký tự",
      check: password.length >= 6,
    },
    {
      name: "it nhat mot ki tu in hoa",
      check: /[A-Z]/.test(password),
    },
    {
      name: "it nhat mot ki tu dac biet",
      check: /[@$!%*#?&]/.test(password),
    }
  ];

  useEffect(() => {
    const isValid = validatePassword.every(rule => rule.check);
    if (isValid && password !== "" && confirmPassword !== "") {
      setIsDisable(false)
    } else {
      setIsDisable(true)
    }
  }, [password, confirmPassword])

  const handeConfirmPassword = async () => {
    if (password === confirmPassword) {
      setError("");
      await AsyncStorage.setItem("password", password);
      router.push("/(auth)/user-biometry");
    } else {
      setError("Mật khẩu không trùng khớp, vui lòng thử lại!");
    }
  }

  return (
    <Layout title="Tạo mật khẩu">
      <View className=" text-base mt-4 flex-col gap-4">
        <View>
          {/* password */}
          <View className="w-full flex-row items-center border border-[#CFD8E1] rounded-2xl px-4 h-16  mt-4">
            <TextInput
              className="flex-1 text-base text-[#334155]"
              placeholder="Nhập mật khẩu"
              placeholderTextColor="#A8B4C2"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!showPassword}
              maxLength={225}
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
          {/* confirm password */}
          <View className="w-full flex-row items-center border border-[#CFD8E1] rounded-2xl px-4 h-16  mt-4">
            <TextInput
              className="flex-1 text-base text-[#334155]"
              placeholder="Xác nhận mật khẩu"
              placeholderTextColor="#A8B4C2"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={!showConfirmPassword}
              maxLength={225}
            />

            {/* Icon con mắt */}
            <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? (
                <HideEyesIcon width={25} height={22} />
              ) : (
                <EyesIcon />
              )}
            </Pressable>
          </View>
        </View>

        <View className="flex-col gap-2 mt-2">
          {validatePassword.map((item, index) => (
            <View key={index} className="flex-row items-center gap-2">
              {item.check ? (
                <SuccessIconGreen />
              ) : (
                <SuccessIconGray />
              )}
              <Text>{item.name}</Text>
            </View>
          ))}
          <Text>(ví dụ : Matkhaucuaban!)</Text>
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
              onPress={handeConfirmPassword}
              isDisabled={isDisable}
            />
          </View>
        </View>
      </View>
    </Layout>
  )
}