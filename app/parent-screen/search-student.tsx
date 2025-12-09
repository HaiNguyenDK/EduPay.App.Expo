import Footer from "@/components/ui/layouts/footer";
import Layout from "@/components/ui/layouts/layout";
import { View, Text, Pressable, TextInput } from "react-native";
import ItemIcon from "../../assets/icons/Line.svg";
import { useState } from "react";
const SearchStudent = () => {
  const [type, setType] = useState<boolean>(true);

  const handleChangeType = () => {
    setType(!type);
  };

  return (
    <Layout bgColor="bg-[#F6F6F6]">
      <View className="mt-5">
        <Pressable className="flex flex-row justify-start items-center gap-3 border border-[#CFD8E1] rounded-2xl px-4 py-3"
          onPress={() => console.log("Search")}
        >
          <ItemIcon />
          <View>
            <Text className="font-medium text-sm text-[#252B37]">Trường mầm non Vườn Yêu Thương</Text>
            <Text className="text-xs text-neutral-500">123 Đường An Dương Vương, Quận 5, TP.HCM</Text>
          </View>
        </Pressable>

        <View>
          <View className="flex flex-row justify-between">
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
        </View>
        {/* Update cái line nha */}
        <View></View>

        {/* Content */}
        {type ? (
          <View className="w-full flex-row items-center align-middle border border-[#CFD8E1] rounded-full px-4 h-16 gap-2">
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
        ) : (
          <View>
            <View className="w-full flex-row items-center align-middle border border-[#CFD8E1] rounded-full px-4 h-16 gap-2">
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
            <View className="w-full flex-row items-center align-middle border border-[#CFD8E1] rounded-full px-4 h-16 gap-2">
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
          </View>
        )}

      </View>

      <Footer>
        <View>

        </View>
      </Footer>
    </Layout>
  );
}

export default SearchStudent