import { View } from "react-native";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import MediPayIcon from "../../../assets/icons/edupay-icon.svg";

interface Props {
  children?: React.ReactNode
}
const Footer: React.FC<Props> = ({ children }) => {
  return (
    <View className="absolute bottom-14 w-full p-4
    flex-row flex-1 justify-center items-center gap-2 shadow-black">
      <View className="border border-[#CFD8E1] py-2 px-1 rounded-xl bg-white shadow ">
        <MediPayIcon />
      </View>
      <View className="flex flex-row justify-between flex-1 gap-2">
        {children}
      </View>
    </View>
  );
};

export default Footer;