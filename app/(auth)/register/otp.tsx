import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import Layout from "@/components/ui/layouts/layout";
import CustomButton from "@/components/ui/Button";

const otp_default = '1234';

export default function OTP() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];
  const [error, setError] = useState("");
  const router = useRouter();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [count, setCount] = useState(3);

  useEffect(() => {
    (async () => {
      const phone = await AsyncStorage.getItem('phone');
      if (phone) {
        console.log("phone in storage", phone);
      }
    })();

    // Bắt đầu countdown
    intervalRef.current = setInterval(() => {
      setCount(prev => {
        if (prev === 1) {
          // dừng timer
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Clear khi unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handeConfirmOTP = () => {
    if (otp.some(value => !value || value.trim() === "")) {
      setError("Mã OTP không được để trống!");
      return;
    }

    if (otp.join("") === otp_default) {
      router.replace("/(auth)/register/set-password");
    } else {
      setError("Mã OTP không đúng, xin vui lòng thử lại!");
    }
  }

  return (
    <Layout
      title={`Xác nhận mã OTP\n gồm 4 chữ số`}
      sub={`Một mã OTP sẽ được gửi về\n số điện thoại của bạn`}
    >
      <View className=" text-base mt-4 flex-col gap-4">
        {/* phone */}
        <View className="w-full flex-row flex-wrap justify-between text-base text-[#334155] px-4">
          {otp.map((value, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              className={`border h-16 w-16 rounded-2xl text-center text-xl ${error ? "border-red-500" : "border-gray-300"}`}
              keyboardType="numeric"
              maxLength={1}
              value={value}
              onChangeText={(text) => handleChange(text, index)}
              textAlign="center"
              textAlignVertical="center"
            />
          ))}
        </View>

        {/* Error */}
        <View className="my-4">
          {error ? (
            <Text
              className="text-red-500 font-roboto text-sm text-center py-2">
              {error}
            </Text>
          ) : (
            <Text className="text-neutral-500 font-roboto text-sm text-center">
              Không nhận được mã?
              <Text className={`${count === 0 ? "text-[#EA3E3E] font-bold" : ""}`}
                onPress={() => console.log("Resend OTP")}
                disabled={count !== 0}
              >
                {" "}Gửi lại mã mới
                <Text className={`${count === 0 ? "font-normal" : ""}`}>{" "}({count}s)</Text>
              </Text>
            </Text>
          )}
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
              title="Đăng ký"
              onPress={handeConfirmOTP}
            />
          </View>
        </View>
      </View>
    </Layout >
  )
}