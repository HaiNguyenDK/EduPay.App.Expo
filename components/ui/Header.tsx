import { View, Image } from "react-native"
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import EdupayLogo from "../../assets/icons/EduPay-logo.svg";

export default function Header() {
  return (
    < View className="relative" >
      <Image
        source={require("../../assets/images/bg-school.jpg")}
        resizeMode="cover"
        className="w-full"
      />
      <View className="absolute inset-0 justify-center items-center">
        <EdupayLogo />
      </View>
    </View >
  )
}