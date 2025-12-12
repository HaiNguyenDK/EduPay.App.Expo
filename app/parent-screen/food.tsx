import Layout from "@/components/ui/layouts/layout";
import { View, Text, Pressable } from "react-native";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ItemIcon from "../../assets/icons/Line.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import DownArrow from "../../assets/icons/down-arrow.svg";
import { useEffect, useState } from "react";
import { IUserData } from "./search-student";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Food = () => {
  const [student, setStudent] = useState<IUserData | null>();

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('student');
        // console.log(jsonValue);
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
    <Layout>
      <View className="flex flex-col gap-4">
        <Pressable className=" flex flex-row justify-between items-center
                      border border-[#CFD8E1] rounded-2xl px-4 py-3"
        // onPress={() => router.push("/parent-screen/search-student")}
        >
          <View className="flex flex-col justify-start items-start">
            <View className="flex flex-row justify-center items-center">
              <ItemIcon />
              <Text className="font-medium text-sm text-neutral-600">{student?.school}</Text>
            </View>
            <Text className="text-xl text-[#334155] font-bold font-roboto">{student?.name}</Text>
          </View>
          <View className="w-11 h-11 border shadow-slate-400 border-neutral-200 rounded-xl
                      flex justify-center items-center">
            <DownArrow />
          </View>
        </Pressable>
      </View>
    </Layout>
  );
}

export default Food;