import { View, Text } from "react-native";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import MediPayIcon from "../../../assets/icons/edupay-icon.svg";

interface Props {
  title?: string
  children?: React.ReactNode
}
const Footer: React.FC<Props> = ({ title, children }) => {
  return (
    <View className="absolute flex flex-col gap-2 left-0 bottom-14 w-full">
      {title &&
        <Text className="text-sm text-neutral-500">
          Bằng cách thanh toán, bạn đồng ý với các <Text className="text-[#3699FF]">điều khoản và chính sách này</Text> của EduPay
        </Text>
      }

      <View className="flex-row flex-1 justify-center items-center gap-2 shadow-black pb-6">
        <View className="border border-[#CFD8E1] py-2 px-1 rounded-xl bg-white shadow ">
          <MediPayIcon />
        </View>
        <View className="flex flex-row justify-between flex-1 gap-2">
          {children}
        </View>
      </View>
    </View>
  );
};

export default Footer;