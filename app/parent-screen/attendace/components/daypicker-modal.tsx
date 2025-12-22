import { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable } from 'react-native';
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ArrowLeft from "../../../../assets/icons/arrow-left.svg";

interface IProps {
  open: boolean;
  onClose: () => void;
  currentMonth: number;
  currentYear: number;
  onSubmit: (month: number, year: number) => void;
}

const months = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
];

const DayPickerModal = ({ open, currentMonth, currentYear, onClose, onSubmit }: IProps) => {
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  return (
    <Modal visible={open} transparent animationType="fade" >
      <Pressable className="flex-1 bg-black/40 items-center justify-center"
        onPress={onClose}>
        <View className="bg-white rounded-2xl w-[90%] p-4">

          {/* YEAR */}
          <View className="flex-row justify-between items-center mb-4 p-3">
            <TouchableOpacity onPress={() => setYear(y => y - 1)}
              className='p-3 rounded-xl border border-gray-400'
            >
              <ArrowLeft />
            </TouchableOpacity>

            <Text className="text-lg font-semibold">Năm {year}</Text>

            <TouchableOpacity onPress={() => setYear(y => y + 1)}
              className='rotate-180 p-3 rounded-xl border border-gray-400'>
              <ArrowLeft />
            </TouchableOpacity>
          </View>

          {/* MONTH GRID */}
          <View className="flex-row justify-between flex-wrap gap-2 px-2">
            {months.map((m, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  setMonth(i + 1);
                  onSubmit(i + 1, year);
                  onClose();
                }}
                className={`w-1/4 py-2 rounded-xl items-center mb-2 ${month === i + 1 ? 'bg-blue-500' : 'bg-gray-100'}`}>
                <Text
                  className={`${month === i + 1 ? 'text-white' : 'text-black'}`}
                >
                  {m}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </Pressable>
    </Modal>
  )
}

export default DayPickerModal;

