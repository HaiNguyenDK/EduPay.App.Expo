import Footer from "@/components/ui/layouts/footer";
import Layout from "@/components/ui/layouts/layout";
import { View, Text, Pressable, TextInput, ScrollView, Image } from "react-native";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ItemIcon from "../../assets/icons/Line.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import CalendarIcon from "../../assets/icons/calendar.svg";
import { useState } from "react";
import { router } from "expo-router";
import Toast from 'react-native-toast-message';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IUserData {
  id: number;
  code: number;
  avt: any;
  name: string;
  class: string;
  birthday: string;
  school: string;
}

const data: IUserData[] = [
  {
    id: 1,
    code: 13843294234422,
    avt: require("../../assets/images/generic-avatar.png"),
    name: "Nguyen Van A",
    class: "8A1",
    birthday: "01/01/2010",
    school: " THPT Nguyễn Bỉnh Khiêm",
  },
  {
    id: 2,
    code: 13843294245436,
    avt: require("../../assets/images/generic-avatar.png"),
    name: "Nguyen Van B",
    class: "8A2",
    birthday: "11/02/2010",
    school: " THPT Chu Văn An",
  },
  {
    id: 3,
    code: 13843294245436,
    avt: require("../../assets/images/generic-avatar.png"),
    name: "Nguyen Van C",
    class: "8A2",
    birthday: "11/02/2010",
    school: " THPT Nguyễn Du",
  },
  {
    id: 4,
    code: 13843294245436,
    avt: require("../../assets/images/generic-avatar.png"),
    name: "Nguyen Van D",
    class: "8A2",
    birthday: "11/02/2010",
    school: " THPT Phan Đăng Lưu",
  },
  {
    id: 5,
    code: 13843294245436,
    avt: require("../../assets/images/generic-avatar.png"),
    name: "Nguyen Van E",
    class: "8A2",
    birthday: "11/02/2010",
    school: " THPT Nguyễn Huệ",
  }
]

const SearchStudent = () => {
  const [type, setType] = useState<boolean>(true);
  const [student, setStudent] = useState<IUserData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [name, setName] = useState<string>("");

  const handleConfirm = (d: Date) => {
    setDate(d);
    setIsVisible(false);
  };
  const handleChangeType = () => {
    setType(!type);
  };

  const handleChangeName = (text: string) => {
    // Chỉ giữ lại chữ cái + khoảng trắng
    const cleaned = text.replace(/[^A-Za-zÀ-ỹ\s]/g, "");
    setName(cleaned);
  };

  const handleSelectStudent = async () => {
    if (!student) {
      Toast.show({
        type: 'error',
        text1: 'Vui lòng chọn học sinh tra cứu',
      });
      return;
    }
    // // router.push(`/parent-screen/search-student/${id}`);
    await AsyncStorage.setItem("student", JSON.stringify(student));
    router.push("/(parent-tabs)/home");
  }

  return (
    <Layout bgColor="bg-[#F6F6F6]">
      <View className="mt-5 flex flex-1 flex-col gap-6">
        <Pressable className="flex flex-row justify-start items-center gap-3 border border-[#CFD8E1] rounded-2xl px-4 py-3"
          onPress={() => console.log("Search")}
        >
          <ItemIcon />
          <View>
            <Text className="font-medium text-sm text-[#252B37]">Trường mầm non Vườn Yêu Thương</Text>
            <Text className="text-xs text-neutral-500">123 Đường An Dương Vương, Quận 5, TP.HCM</Text>
          </View>
        </Pressable>

        <View className="flex flex-col gap-4 px-4">
          <View className="flex flex-row justify-center gap-8">
            <Pressable onPress={handleChangeType}>
              <Text className={`${type ? "text-[#EA3E3E]" : "text-[#49454F]"} font-medium`}>
                Mã học sinh
              </Text>
            </Pressable>
            <Pressable onPress={handleChangeType}>
              <Text className={`${!type ? "text-[#EA3E3E]" : "text-[#49454F]"} font-medium`}>
                Thông tin cá nhân
              </Text>
            </Pressable>
          </View>
          <View className="w-full border border-[#CFD8E1] "></View>
        </View>

        <ScrollView className="mb-36">
          {/* Content */}
          {type ? (
            <View className="w-full flex-row items-center align-middle border border-[#CFD8E1] rounded-2xl px-4 h-16 gap-2">
              <TextInput
                className="flex-1 text-base text-[#334155]"
                // value={phone}
                // onChangeText={handleChangePhone}
                // onBlur={validatePhone}
                keyboardType="default"
                placeholder="Nhập mã học sinh để tra cứu"
                placeholderTextColor="#A8B4C2"
              />
            </View>
          ) : (
            <View className="flex flex-col gap-4">
              <View className="w-full flex-row items-center align-middle border border-[#CFD8E1] rounded-2xl px-4 h-16 gap-2">
                <TextInput
                  className="flex-1 text-base text-[#334155]"
                  value={name}
                  onChangeText={handleChangeName}
                  placeholder="Nhập tên học sinh"
                  placeholderTextColor="#A8B4C2"
                />
              </View>

              <Pressable className="w-full flex-row items-center align-middle border border-[#CFD8E1] rounded-2xl px-4 h-16 gap-2"
                onPress={() => setIsVisible(true)}
              >
                <View className="flex flex-row justify-between items-center w-full">
                  {date ? (
                    <Text className="text-lg">{date?.toLocaleDateString("vi-VN")}</Text>
                  ) : (
                    <Text className="text-base text-[#A8B4C2]">Ngày / Tháng / Năm sinh</Text>
                  )}
                  <CalendarIcon />
                </View>


                <DateTimePickerModal
                  isVisible={isVisible}
                  mode="date"
                  maximumDate={new Date()}
                  onConfirm={handleConfirm}
                  onCancel={() => setIsVisible(false)}
                />
              </Pressable>
            </View>
          )}

          <View className="flex flex-col gap-4 mt-4">
            {data.map((item) => (
              <Pressable key={item.id}
                className={`flex flex-col justify-between border ${student?.id === item.id ? "border-[#EA3E3E]" : "border-[#CFD8E1]"} 
                rounded-3xl p-6 gap-2 bg-white`}
                onPress={() => setStudent(item)}
              >
                <View className="flex flex-row gap-4 items-center">
                  <Image source={item.avt} />
                  <View>
                    <Text className="text-xs text-neutral-900 font-[300]">Mã số {item.code}</Text>
                    <Text className="text-base text-neutral-900 font-medium">{item.name}</Text>
                  </View>
                </View>
                <View className="flex flex-row gap-4 justify-between">
                  <Text>Lớp </Text>
                  <Text>{item.class}</Text>
                </View>
                <View className="flex flex-row gap-4 justify-between">
                  <Text>Ngày sinh </Text>
                  <Text>{item.birthday}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View >

      <Footer>
        <Pressable className="flex-1 border border-[#CFD8E1] p-4 rounded-full"
          onPress={() => router.back()}
        >
          <Text className="text-center text-sm font-medium text-neutral-900">
            Quay Lại
          </Text>
        </Pressable>
        <Pressable className="flex-1 p-4 bg-[#EA3E3E] rounded-full"
          onPress={() => handleSelectStudent()}
        >
          <Text className="text-center text-sm font-medium text-white">
            Tra cứu
          </Text>
        </Pressable>
      </Footer>
    </Layout >
  );
}

export default SearchStudent;
