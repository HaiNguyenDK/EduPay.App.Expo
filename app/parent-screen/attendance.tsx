import Layout from "@/components/ui/layouts/layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, Animated, useWindowDimensions, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { IUserData } from "./search-student";
import CalendarGrid42 from "./attendace/components/month-calendar";
// import WareSelect from "../../assets/icons/ware.svg";
import Footer from "@/components/ui/layouts/footer";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ItemIcon from "../../assets/icons/Line.svg";
import { router } from "expo-router";
import { ATTENDANCE_UI, mockMonthlyAttendance } from "./data";
import CalendarWeekView from "./attendace/components/week-calendar";
import PopUpDetailAttendace from "./attendace/components/popup-detail-attendace";
import { AttendanceRecord } from "@/types/models/attendance";
import { AttendanceStatus } from "@/types/enums/common";

const Attendance = () => {
  const [active, setActive] = useState(0);
  const indicator = useRef(new Animated.Value(0)).current;
  const [student, setStudent] = useState<IUserData | null>();
  // const width = useWindowDimensions().width;
  // console.log(width);
  const [openDetail, setOpenDetail] = useState(false);
  const [record, setRecord] = useState<AttendanceRecord | null>(null);
  const tabs = ["Dạng thẻ", "Dạng lịch"];
  const TAB_WIDTH = 185;

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

  const handlePress = (index: number) => {
    setActive(index);

    Animated.spring(indicator, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Layout utilityTitle="Điểm Danh">
        <View >
          <View className="flex flex-col justify-around px-10 ">
            <Animated.View
              className="h-[4px] w-[70px] bg-red-500 rounded-b-full mb-2"
              style={{
                transform: [{ translateX: indicator }],
              }}
            />
            <View className="relative flex flex-row gap-6 justify-between">
              {tabs.map((item, index) => (
                <Pressable key={index} onPress={() => handlePress(index)}>
                  <View className="items-center w-[70px]">
                    <Text
                      className={`text-base font-semibold 
                    ${active === index ? "text-red-500" : "text-gray-600"}`}
                    >
                      {item}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
            {/* <View className={`absolute w-full right-2 top-0`}>
                  <WareSelect />
                </View> */}
          </View>

          <View className="h-[75%]">
            {active === 0 &&
              <View className="flex flex-col items-center justify-center h-full">
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior={Platform.OS === "ios" ? "padding" : "padding"} // iOS: padding, Android: height
                  keyboardVerticalOffset={Platform.OS === "ios" ? 160 : 160} // điều chỉnh offset nếu cần
                  className="h-[80%] mt-5"
                >
                  <ScrollView
                    className="px-2"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                    keyboardShouldPersistTaps="handled"
                  >
                    <CalendarWeekView data={mockMonthlyAttendance}
                      onDatePress={(record) => { setOpenDetail(true); setRecord(record) }} />
                  </ScrollView>
                </KeyboardAvoidingView>

              </View>
            }
            {active === 1 &&
              <View className="flex flex-col gap-4 h-[75%]">
                <CalendarGrid42 data={mockMonthlyAttendance} />
                <View className="flex flex-row justify-center items-center gap-4">
                  <View className="flex flex-row items-center gap-4 justify-between">
                    <View className="w-2 h-2 bg-green-600 rounded-full"></View>
                    <Text>Có mặt</Text>
                  </View>
                  <View className="flex flex-row items-center gap-4 justify-between">
                    <View className="w-2 h-2 bg-[#EA3E3E] rounded-full"></View>
                    <Text>Vắng mặt</Text>
                  </View>
                  <View className="flex flex-row items-center gap-4 justify-between">
                    <View className="w-2 h-2 bg-[#F98646] rounded-full"></View>
                    <Text>Đi trễ</Text>
                  </View>
                </View>
              </View>
            }
          </View>
          <Footer >
            <Pressable className="flex-1 border border-[#CFD8E1] p-4 rounded-full"
              onPress={() => router.back()}
            >
              <Text className="text-center text-sm font-medium text-neutral-900">
                Quay Lại
              </Text>
            </Pressable>
          </Footer>
        </View>

      </Layout >


      <PopUpDetailAttendace
        open={openDetail}
        onClose={() => setOpenDetail(false)}
      >
        <View className=" flex flex-row justify-between items-center
                                      border border-[#CFD8E1] rounded-2xl px-8 py-4 mx-2"
        // onPress={() => router.push("/parent-screen/search-student")}
        >
          <View className="flex flex-col justify-start items-start">
            <View className="flex flex-row justify-center items-center">
              <ItemIcon />
              <Text className="font-medium text-sm text-neutral-600">{student?.school}</Text>
            </View>
            <Text className="text-xl text-[#334155] font-bold font-roboto">{student?.name}</Text>
          </View>
        </View>
        <View className="flex flex-col gap-2 px-8 py-4 mt-4">
          <View className="flex flex-row justify-between items-center">
            <Text>Trạng thái</Text>
            <Text >{ATTENDANCE_UI[record?.status || AttendanceStatus.PRESENT].label}</Text>
          </View>
          <View className="flex flex-row justify-between items-center">
            <Text>Giáo viên</Text>
            <Text className="text-lg font-bold text-[#334155]">Cô Lê Thị Mai</Text>
          </View>
          <View className="flex flex-row justify-between items-center">
            <Text>Lớp</Text>
            <Text className="text-lg font-bold text-[#334155]">{student?.class}</Text>
          </View>
          <View className="flex flex-row justify-between items-center">
            <Text>Thời gian điểm danh</Text>
            <Text className="text-lg font-bold text-[#334155]">{record?.date}</Text>
          </View>
          <View className="flex flex-row justify-between items-center">
            <Text>Ghi Chú</Text>
            <Text className="text-neutral-900 text-lg">{record?.note}</Text>
          </View>

        </View>
      </PopUpDetailAttendace>
    </>
  )
}

export default Attendance;