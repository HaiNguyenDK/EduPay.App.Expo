import Header from "@/components/ui/Header";
import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import RightArrow from "../../../assets/icons/right-arrow.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import EdupayLogo from "../../../assets/icons/EduPay-logo.svg";

interface Props {
  title?: string;
  sub?: string;
  backButton?: boolean;
  children?: React.ReactNode;
  isFull?: boolean
  bgColor?: string
}

const Layout: React.FC<Props> = ({
  title,
  sub,
  backButton,
  children,
  isFull,
  bgColor
}) => {
  const router = useRouter();
  return (
    <View className="flex-1 w-full">
      {/* Header */}
      < View className="relative" >
        <Image
          source={require("../../../assets/images/bg-school.jpg")}
          resizeMode="cover"
          className="w-full"
        />
        <View className="absolute inset-0 justify-center items-center">
          <EdupayLogo />
        </View>
      </View >

      {/* Body */}
      <View className={`px-6 flex-col gap-6 font-roboto border-t border-white ${bgColor ? bgColor : "bg-white"} z-10
       ${isFull ? "-mt-48" : "-mt-4"} rounded-t-3xl h-screen`}>
        {title &&
          <View className="flex-row justify-center items-center align-middle mt-8">
            {backButton &&
              <Pressable
                className="absolute left-0 rounded-full border border-[#CBD5E1] px-6 py-4"
                onPress={() => router.back()}>
                <RightArrow />
              </Pressable>}
            <Text className="text-2xl font-bold text-center">
              {title}
            </Text>
          </View>
        }

        {sub && <Text className="text-sm text-center text-[#64748B]">{sub}</Text>}
        <View className="mb-4 max-h-full min-h-[80%] px-2">
          {children}
        </View>
      </View>
    </View>
  )
}

export default Layout;