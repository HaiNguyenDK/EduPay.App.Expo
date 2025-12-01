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

interface Props {
  title?: string;
  sub?: string;
  children?: React.ReactNode;
}


const Layout: React.FC<Props> = ({ title, sub, children }) => {
  return (
    <View className="flex-1">
      <Header />
      {/* Body */}
      <View className="px-6 flex-col gap-6 font-roboto">
        <Text className="text-2xl font-bold text-center mt-8">
          {title ? title : `Đăng nhập để sử dụng\n tiện ích EduPay`}
        </Text>
        {sub && <Text className="text-sm text-center text-[#64748B]">{sub}</Text>}
        <View className="mb-4">
          {children}
        </View>
      </View>
    </View>
  )
}

export default Layout;