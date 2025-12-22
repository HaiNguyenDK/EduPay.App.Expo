import Header from "@/components/ui/Header";
import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import RightArrow from "../../../assets/icons/left-arrow.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import EdupayLogo from "../../../assets/icons/EduPay-logo.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ItemIcon from "../../../assets/icons/Line.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import DownArrow from "../../../assets/icons/down-arrow.svg";
import { useEffect, useState } from "react";
import { IUserData } from "@/app/parent-screen/search-student";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "./footer";

interface Props {
  title?: string;
  sub?: string;
  backButton?: boolean;
  children?: React.ReactNode;
  isFull?: boolean
  bgColor?: string
  utilityTitle?: string
  clasName?: string
  footer?: React.ReactNode
}

const Layout: React.FC<Props> = ({
  title,
  sub,
  backButton,
  children,
  isFull,
  bgColor,
  utilityTitle,
  clasName,
  footer
}) => {
  const router = useRouter();

  const [student, setStudent] = useState<IUserData | null>();

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('student');
        console.log(jsonValue);
        if (jsonValue != null) {
          setStudent(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadStudent();
  }, []);

  return (
    <View className={`flex-1 w-full ${clasName}`}>
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
      <View className={`px-6 flex-col gap-6 font-roboto border-t border-white ${bgColor ? bgColor : "bg-white"} z-2
       ${isFull ? "-mt-48" : "-mt-12"} rounded-t-3xl h-screen`}>
        {title &&
          <View className="flex-row justify-center items-center align-middle mt-8">
            {backButton &&
              <Pressable
                className="absolute left-0 rounded-full border border-[#CBD5E1] px-6 py-4"
                onPress={() => router.back()}>
                <RightArrow />
              </Pressable>
            }
            {title &&
              <Text className="text-2xl font-bold text-center">
                {title}
              </Text>
            }
          </View>
        }

        {utilityTitle && student &&
          <View className="flex flex-col gap-4 mt-4">
            <View className="flex flex-row gap-8">
              <Image source={require("../../../assets/images/blingbling.png")} />
              <Text className="text-xl font-bold text-[#334155]">{utilityTitle}</Text>
            </View>

            <Pressable className=" flex flex-row justify-between items-center
                border border-[#CFD8E1] rounded-2xl px-4 py-3"
            // onPress={() => router.push("/parent-screen/search-student")}
            >
              <View className="flex flex-col justify-start items-start">
                <View className="flex flex-row justify-center items-center">
                  <ItemIcon />
                  <Text className="font-medium text-sm text-neutral-600">{student.school}</Text>
                </View>
                <Text className="text-xl text-[#334155] font-bold font-roboto">{student.name}</Text>
              </View>
              <View className="w-11 h-11 border shadow-slate-400 border-neutral-200 rounded-xl
                flex justify-center items-center">
                <DownArrow />
              </View>
            </Pressable>
          </View>
        }

        {sub && <Text className="text-sm text-center text-[#64748B]">{sub}</Text>}
        <View className="mb-4 min-h-[80%] px-2">
          {children}
        </View>
      </View>
    </View>
  )
}

export default Layout;