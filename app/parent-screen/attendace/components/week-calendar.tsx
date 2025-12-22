import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // nếu muốn hiển thị tiếng Việt
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import { View, Text, Pressable } from 'react-native';
import React, { use, useEffect, useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react-native'; // hoặc dùng icon SVG của bạn
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ArrowLeft from "../../../../assets/icons/arrow-left.svg";
import { MonthlyAttendance, AttendanceRecord } from '@/types/models/attendance';
import { ATTENDANCE_UI } from '../../data';
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import CorrectIcon from '../../../../assets/icons/correct.svg';
import PopUpDetailAttendace from './popup-detail-attendace';

dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.locale('vi'); // optional: hiển thị thứ bằng tiếng Việt

interface CalendarWeekViewProps {
  data?: MonthlyAttendance;
  currentDate?: dayjs.Dayjs; // để control từ ngoài nếu cần
  onDatePress?: (record: AttendanceRecord) => void;
}

const CalendarWeekView: React.FC<CalendarWeekViewProps> = ({
  data,
  currentDate = dayjs(),
  onDatePress,
}) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);

  // Tính toán 7 ngày của tuần hiện tại (bắt đầu từ Thứ 2 - chuẩn ISO)
  const startOfWeek = selectedDate.startOf('isoWeek'); // Thứ 2

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = startOfWeek.add(i, 'day');
    const dateString = date.format('YYYY-MM-DD');
    const record = data?.records.find(r => r.date === dateString) || data?.records.find(r => r.date === dateString);

    return {
      date,
      dateString,
      day: date.date(), // số ngày
      weekday: date.format('dddd'), // Thứ Hai, Thứ Ba...
      isToday: date.isSame(dayjs()),
      record,
    };
  });

  const goPrevWeek = () => setSelectedDate(prev => prev.subtract(1, 'week'));
  const goNextWeek = () => setSelectedDate(prev => prev.add(1, 'week'));
  const goToday = () => setSelectedDate(dayjs());

  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord>();
  const handleDetailAttendance = (d: AttendanceRecord | undefined) => {
    if (!d) return;
    onDatePress && onDatePress(d);
  };
  return (
    <>
      <View className="flex-1 flex flex-col gap-4 bg-white rounded-2xl w-full mt-4">
        {/* Header tuần */}
        <View className="flex-row justify-between items-center ">
          <Pressable onPress={goPrevWeek}>
            <ArrowLeft />
          </Pressable>

          <Text className="text-lg font-bold text-[#334155]">
            Tuần {startOfWeek.format('DD')} - {startOfWeek.add(6, 'day').format('DD MMM YYYY')}
          </Text>

          <Pressable onPress={goNextWeek} className="rotate-180">
            <ArrowLeft />
          </Pressable>
        </View>

        <View className='flex flex-row justify-between items-center'>
          {Object.entries(ATTENDANCE_UI).map(([key, value]) => (
            <View key={key} className={`w-24 h-20 ${value.color} border ${value.borderColor} rounded-2xl flex flex-col justify-center items-center`}>
              <Text className={`${value.textColor} font-bold text-lg`}>
                {days.filter(d => d.record?.status === key).length}
              </Text>
              <Text className={`${value.textColor} font-bold text-lg`}>{value.label}</Text>
            </View>
          ))}

        </View>
        {/* Nút Hôm nay (optional) */}
        {/* <Pressable onPress={goToday} className="self-center mb-4 px-6 py-2 bg-red-500 rounded-full">
        <Text className="text-white font-medium">Hôm nay</Text>
      </Pressable> */}

        {/* Grid 7 ngày */}
        <View className="flex flex-col gap-2">
          {days.map((d) => {
            const ui = d.record ? ATTENDANCE_UI[d.record.status] : null
            const date = dayjs(d.dateString)

            return (
              <Pressable key={d.dateString}
                className={`flex flex-row items-center justify-between w-full h-16 px-4 border border-neutral-200 rounded-2xl`}
                onPress={() => handleDetailAttendance(d.record)}
              >
                {/* Thứ + ngày */}
                <View className="flex flex-row justify-center items-center gap-4">
                  <View className={`${ui?.color} flex items-center justify-center w-10 h-10 rounded-2xl`}>
                    <View className={`${ui?.iconBg} flex items-center justify-center w-6 h-6 rounded-full`}>
                      <CorrectIcon />
                    </View>
                  </View>

                  <Text
                    className={`text-xl font-semibold`}>
                    {date.locale('vi').format('ddd')}, {date.format('DD/MM')}
                  </Text>
                </View>

                {/* Trạng thái điểm danh */}
                {d.record && (
                  <View className={`flex flex-row items-center gap-1 ${ui?.color} px-4 py-1 rounded-full`}>
                    <View className={`w-1 h-1 rounded-full ${ui?.iconBg}`} />
                    <Text className={`text-sm ${d.isToday ? 'text-white' : ui?.textColor}`}>
                      {ui?.label}
                    </Text>
                  </View>
                )}
              </Pressable>
            )
          })}
        </View>
      </View>
    </>

  );
};

export default CalendarWeekView;