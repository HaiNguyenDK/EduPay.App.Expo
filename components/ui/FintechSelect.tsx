// import React, { useState } from "react";
// import DropDownPicker from "react-native-dropdown-picker";
// import { View, Text } from "react-native";

// interface Props {
//   label?: string;
//   placeholder?: string;
//   items?: any[];
//   value?: any;
//   setValue?: any;
// }

// const FintechSelect: React.FC<Props> = ({
//   label,
//   placeholder,
//   items,
//   value,
//   setValue
// }) => {
//   const [open, setOpen] = useState(false);
//   const [list, setList] = useState(items);

//   return (
//     <View className="mt-4">
//       <Text className="text-xs text-[#94A3B8] mb-1">{label}</Text>

//       <DropDownPicker
//         open={open}
//         value={value}
//         items={list}
//         setOpen={setOpen}
//         setValue={setValue}
//         setItems={setList}

//         // ---------- UI ----------
//         placeholder={placeholder}

//         style={{
//           backgroundColor: "#F8FAFC",
//           borderColor: "#E2E8F0",
//           borderRadius: 14,
//           height: 52,
//           paddingHorizontal: 12,
//         }}

//         dropDownContainerStyle={{
//           backgroundColor: "#F8FAFC",
//           borderColor: "#E2E8F0",
//           borderRadius: 14,
//         }}

//         labelStyle={{
//           fontSize: 16,
//           color: "#1E293B",
//         }}

//         placeholderStyle={{
//           fontSize: 16,
//           color: "#94A3B8",
//         }}

//         arrowIconStyle={{
//           width: 20,
//           height: 20,
//           tintColor: "#64748B",
//         }}

//         listItemContainerStyle={{
//           borderBottomColor: "#E2E8F0",
//         }}

//         listItemLabelStyle={{
//           color: "#1E293B",
//           fontSize: 15,
//         }}
//       />
//     </View>
//   );
// }


// export default FintechSelect;