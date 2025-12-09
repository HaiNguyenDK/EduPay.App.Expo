import { View } from "react-native";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import MediPayIcon from "../../../assets/icons/edupay-icon.svg";

interface Props {
  children?: React.ReactNode
}
const Footer: React.FC<Props> = ({ children }) => {
  return (
    <View className="0 w-full flex-row justify-center items-center bg-white">
      <View className="border border-neutral-500 p-2 rounded-xl bg-white shadow ">
        <MediPayIcon />
      </View>
      <View>
        {children}
      </View>
    </View>
  );
};

export default Footer;