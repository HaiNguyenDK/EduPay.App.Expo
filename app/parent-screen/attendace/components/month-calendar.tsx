import { View, Text, Pressable } from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { useState } from 'react';
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ArrowLeft from "../../../../assets/icons/arrow-left.svg";
import DayPickerModal from './daypicker-modal';
import { MonthlyAttendance } from '@/types/models/attendance';
import { ATTENDANCE_UI } from '../../data';

interface IProps {
  data?: MonthlyAttendance
}

const CalendarGrid42: React.FC<IProps> = ({
  data
}) => {
  // const year = dayjs().year();
  // const month = dayjs().month() + 1;

  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month() + 1);
  const currentDay = dayjs().date();
  const [visible, setVisible] = useState(false);

  const firstDayOfMonth = dayjs(`${year}-${month}-01`);

  // Mon = 0, Sun = 6
  const startWeekday = (firstDayOfMonth.day() + 6) % 7;
  const startDate = firstDayOfMonth.subtract(startWeekday, 'day');

  const days = Array.from({ length: 42 }, (_, i) => {
    const date = startDate.add(i, 'day');
    return {
      dateString: date.format('YYYY-MM-DD'),
      day: date.date(),
      isCurrentMonth: date.month() + 1 === month,
    };
  });

  return (
    <>
      <View className="w-full h-fit mt-4 flex flex-col gap-2 ">
        <View className='flex flex-row justify-between items-center mb-4'>
          <Pressable onPress={() => setMonth(month - 1)}>
            <ArrowLeft />
          </Pressable>
          <Pressable onPress={() => setVisible(true)}>
            <Text className="text-xl font-semibold text-neutral-700">
              {dayjs(`${year}-${month}-01`).locale('vi').format('MMMM / YYYY')}
            </Text>
          </Pressable>
          <Pressable className='rotate-180' onPress={() => setMonth(month + 1)}>
            <ArrowLeft />
          </Pressable>
        </View>

        <View className="flex flex-row">
          {['Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'CN'].map((d) => (
            <View key={d} className="w-[14.28%] items-center">
              <Text className="text-xs font-semibold text-gray-500">
                {d}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex flex-row flex-wrap gap-x-1">
          {days.map((d) => {
            const record = data?.records.find(r => r.date === d.dateString);
            return (
              <View key={d.dateString}
                // map data
                className={`w-[13%] h-12 items-center justify-center ${d.isCurrentMonth ? '' : 'opacity-40'}
              ${record?.status && record.date < dayjs().format('YYYY-MM-DD') ? `${ATTENDANCE_UI[record.status].color} rounded-full` : ''}`}
              >
                <Text className={`${d.day === currentDay && month === dayjs().month() + 1 ? 'text-[#EA3E3E] font-bold'
                  : ''} text-base font-roboto font-bold 
                  ${record?.status && record.date < dayjs().format('YYYY-MM-DD') ? `${ATTENDANCE_UI[record.status].textColor} rounded-full` : ''}
                  `}>
                  {d.day}
                </Text>
                {d.day === currentDay && month === dayjs().month() + 1 &&
                  <Text className='text-[#EA3E3E] text-[10px]'>
                    Hôm nay
                  </Text>
                }
              </View>
            )
          })}
        </View>
      </View>

      <DayPickerModal
        open={visible}
        currentMonth={month}
        currentYear={year}
        onClose={() => setVisible(false)}
        onSubmit={(m: number, y: number) => {
          setMonth(m);
          setYear(y);
        }}
      />
    </>

  );
};

export default CalendarGrid42;