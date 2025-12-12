import Layout from "@/components/ui/layouts/layout";
import { View, Text, Image, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import SearchIcon from "../../assets/icons/search-normal.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ItemIcon from "../../assets/icons/Line.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import DownArrow from "../../assets/icons/down-arrow.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import TraCuu from "../../assets/icons/tracuuhocphi.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import DiemDanh from "../../assets/icons/diemdanh.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import LichHoc from "../../assets/icons/lichhoc.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import Xinnghi from "../../assets/icons/xinnghi.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)  
import ThucDon from "../../assets/icons/thucdon.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import NotiIcon from "../../assets/icons/noti.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ChatIcon from "../../assets/icons/chat-icon.svg";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import RightArrow from "../../assets/icons/right-arrow.svg";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { IUserData } from "../parent-screen/search-student";

const utilities = [
  {
    id: 1,
    title: "Tra cứu học phí",
    img: <TraCuu />,
    onclick: () => router.push("/parent-screen/list-bill")
  },
  {
    id: 2,
    title: "Điểm danh",
    img: <DiemDanh />,
    onclick: () => router.push("/parent-screen/attendance")
  },
  {
    id: 3,
    title: "Lịch học",
    img: <LichHoc />,
    onclick: () => router.push("/parent-screen/schedule")
  },
  {
    id: 4,
    title: "Xin nghỉ",
    img: <Xinnghi />,
    onclick: () => router.push("/parent-screen/leave")
  },
  {
    id: 5,
    title: "Thực đơn",
    img: <ThucDon />,
    onclick: () => router.push("/parent-screen/food")
  }
]

const HomeParent = () => {
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
    <Layout bgColor="bg-[#F6F6F6]">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"} // iOS: padding, Android: height
        keyboardVerticalOffset={Platform.OS === "ios" ? 160 : 160} // điều chỉnh offset nếu cần
        className="mb-[130px] mt-5"
      >
        <ScrollView className="px-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          {student ? (
            <View className="flex flex-col gap-4">
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

              <View className="flex flex-row gap-8">
                <Image source={require("../../assets/images/blingbling.png")} />
                <Text className="text-xl font-bold text-[#334155]">Tiện ích học đường</Text>
              </View>
              {/* Grid */}
              <View className="flex-row flex-wrap -mx-2 gap-2 justify-between items-center">
                {utilities.map((item) => (
                  <Pressable key={item.id}
                    className="w-[48%] p-4 mb-2 border border-[#CFD8E1] rounded-2xl flex flex-col justify-center items-center"
                    onPress={() => item.onclick()}
                  >
                    {item.img}
                    <Text className="text-lg font-bold text-[#334155] mt-2">{item.title}</Text>
                    <View className="absolute top-3 right-3">
                      <NotiIcon />
                    </View>
                  </Pressable>
                ))}
              </View>

              <View className="flex flex-row justify-between items-center align-middle">
                <View className="flex flex-row justify-between items-center flex-1 gap-3">
                  <ChatIcon />
                  <Text className="font-roboto font-bold text-xl text-neutral-800">Tin từ Trường</Text>
                </View>
                <Pressable className="flex flex-row flex-1 justify-end items-center gap-1 align-middle">
                  <Text className="text-base font-semibold text-neutral-400">Xem tất cả</Text>
                  <RightArrow />
                </Pressable>
              </View>

              {/* Content */}
              <View className="flex flex-col gap-2">
                <View>
                  <Image source={require("../../assets/images/classRoom.jpg")}
                    className="w-full h-[150px] rounded-2xl" />
                  <Text className="absolute top-4 right-4 text-sm rounded-3xl bg-white py-3 px-5 text-neutral-600">Hôm qua</Text>
                </View>
                <Text className="font-roboto font-bold text-xl text-neutral-800">Ra mắt "VnEdu Connect": App tra cứu học phí và kết nối nhà trường</Text>
                <Text className="font-roboto text-sm text-neutral-400">Ứng dụng mới giúp phụ huynh dễ dàng theo dõi tình hình học tập, tra cứu và thanh toán học phí trực tuyến cho con em mình một cách nhanh chóng.</Text>
              </View>

              <View>
                {[1, 2, 3, 4, 5].map((item) => (
                  <View key={item} className="flex flex-row justify-between gap-4">
                    <Image source={require("../../assets/images/olympia.jpg")} className="w-32 h-32 rounded-2xl" />
                    <View className="flex flex-col gap-2 flex-1">
                      <Text className="font-roboto text-sm text-neutral-600">23/12/2024</Text>
                      <Text className="font-roboto text-lg text-[#334155]">
                        {`Thí sinh Lê Xuân Mạnh giành vòng nguyệt quế "Đường lên đỉnh Olympia 2023"`}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>


            </View>
          ) : (
            <View className="flex-col gap-4">
              <View className="flex flex-row gap-5">
                <Image source={require("../../assets/images/Exclude.png")} />
                <View className="flex flex-col gap-2">
                  <Text className="font-semibold text-sm">Thông tin của bạn chưa có dữ liệu tại hệ thống EduPay</Text>
                  <Text className="text-xs text-neutral-500">Trường đã liên kết nhưng vẫn không có thông tin phụ huynh,{"\n"} vui lòng báo giáo viên cập nhật lại số điện thoại.</Text>
                </View>
              </View>

              <View className="flex flex-row gap-8">
                <Image source={require("../../assets/images/blingbling.png")} />
                <Text className="text-xl font-bold text-[#334155]">Tra cứu trường đã liên kết</Text>
              </View>

              <View className="w-full flex-row items-center align-middle border border-[#CFD8E1] rounded-full px-4 h-16 gap-2">
                <Pressable onPress={() => console.log("Scan")}>
                  <SearchIcon />
                </Pressable>
                <TextInput
                  className="flex-1 text-base text-[#334155]"
                  // value={phone}
                  // onChangeText={handleChangePhone}
                  // onBlur={validatePhone}
                  keyboardType="numeric"
                  placeholder="Nhập tên trường, quận, thành phố"
                  placeholderTextColor="#A8B4C2"
                />
              </View>

              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <Pressable key={item} className="flex flex-row justify-start items-center gap-3
                border border-[#CFD8E1] rounded-2xl px-4 py-3"
                  onPress={() => router.push("/parent-screen/search-student")}
                >
                  <ItemIcon />
                  <View>
                    <Text className="font-medium text-sm text-[#252B37]">Trường mầm non Vườn Yêu Thương</Text>
                    <Text className="text-xs text-neutral-500">123 Đường An Dương Vương, Quận 5, TP.HCM</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout >
  );
};

export default HomeParent;