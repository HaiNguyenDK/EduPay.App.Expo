import Layout from "@/components/ui/layouts/layout";
import { View, Image, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
// @ts-ignore: allow importing SVG without type declarations (create a '*.svg' declaration file to properly type this)
import ShieldCheckIcon from "../../assets/icons/Shield-icon.svg";
import CustomButton from "@/components/ui/Button";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SuccessVerifyModal from "@/components/ui/modals/SuccessVerify";

export default function UserInfor() {
  const [selectedValue, setSelectedValue] = useState("");
  const [ethnicity, setEthnicity] = useState('');
  const [job, setJob] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dob, setDob] = useState(Date.now());
  const [isValidated, setIsValidated] = useState(false);

  return (
    <Layout
      title="Xác thực thông tin"
      isFull={true}
      backButton={true}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"} // iOS: padding, Android: height
        keyboardVerticalOffset={Platform.OS === "ios" ? 160 : 160} // điều chỉnh offset nếu cần
      >
        <ScrollView className="px-2" showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <Image
              source={require("../../assets/images/use-avatar.png")}
              resizeMode="cover"
              className="w-[100px] h-[100px] m-auto rounded-full border-4 border-[#E2E8F0]"
            />
          </View>

          <View className="items-center mt-4 font-plus">
            {/* Container chính */}
            <View className="bg-pink-100 rounded-xl px-4 py-3 flex-row z-10">
              <View className=" mr-3">
                <ShieldCheckIcon />
              </View>
              <Text className="text-gray-700 flex-1">
                Thông tin được xác thực bởi Cục Cảnh Sát quản lý hành chính về trật tự và xã hội
              </Text>
            </View>

            {/* Mũi tên nhọn */}
            <View className="w-8 h-8 bg-pink-100 transform rotate-45 -mt-6 rounded-xl"></View>
          </View>

          <View className="flex-1 mt-4">
            {/* Họ và tên */}
            <View className="bg-[#F8FAFC] rounded-2xl px-4 py-2 mt-2">
              <Text className="text-xs text-[#94A3B8] pl-1">Họ và tên</Text>
              <TextInput
                className="text-base text-[#1E293B]"
                value="Nguyễn Thanh Tùng"
                // onChangeText={handleChangePhone}
                placeholder="Nhập số họ và tên"
                placeholderTextColor="#A8B4C2"
              />
            </View>
            {/* Giới Tính */}
            <View className="bg-[#F8FAFC] rounded-2xl px-4 py-2 mt-2">
              <Text className="text-xs text-[#94A3B8] pl-1">Giới tính</Text>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
              >
                <Picker.Item label="Nam" value="male" />
                <Picker.Item label="Nữ" value="female" />
              </Picker>
            </View>
            {/* Ngày sinh */}
            <View className="bg-[#F8FAFC] rounded-2xl px-4 py-2 mt-2">
              <Text className="text-xs text-[#94A3B8] pl-1">Ngày/Tháng/Năm Sinh</Text>
              <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                <Text>{dob ? new Date(dob).toLocaleDateString() : new Date().toLocaleDateString()}</Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                maximumDate={new Date()}
                onConfirm={(date) => {
                  setDob(date.getTime());
                  setDatePickerVisibility(false);
                }}
                onCancel={() => setDatePickerVisibility(false)}
              />
            </View>
            {/* Số CMND/CCCD/Passport */}
            <View className="bg-[#F8FAFC] rounded-2xl px-4 py-2 mt-2">
              <Text className="text-xs text-[#94A3B8] pl-1">Số CMND/CCCD/Passport</Text>
              <TextInput
                className="text-base text-[#1E293B]"
                // onChangeText={handleChangePhone}
                keyboardType="numeric"
                maxLength={12}
                placeholder="Nhập số CMND/CCCD/Passport"
                placeholderTextColor="#A8B4C2"
              />
            </View>
            {/* Số diện thoại liên hệ */}
            <View className="bg-[#F8FAFC] rounded-2xl px-4 py-2 mt-2">
              <Text className="text-xs text-[#94A3B8] pl-1">Số diện thoại liên hệ</Text>
              <TextInput
                className="text-base text-[#1E293B]"
                // onChangeText={handleChangePhone}
                placeholder="Nhập số diện thoại liên hệ"
                keyboardType="numeric"
                maxLength={10}
                placeholderTextColor="#A8B4C2"
              />
            </View>
            {/* Email */}
            <View className="bg-[#F8FAFC] rounded-2xl px-4 py-2 mt-2">
              <Text className="text-xs text-[#94A3B8] pl-1">Email</Text>
              <TextInput
                className="text-base text-[#1E293B]"
                keyboardType="email-address"
                placeholder="Nhập số email"
                autoCorrect={true}
                placeholderTextColor="#A8B4C2"
              />
            </View>
            {/* Dân tộc */}
            <View className="bg-[#F8FAFC] rounded-2xl px-4 py-2 mt-2">
              <Text className="text-xs text-[#94A3B8] pl-1">Dân tộc</Text>
              <Picker
                selectedValue={ethnicity}
                onValueChange={(itemValue) => setEthnicity(itemValue)}
              >
                <Picker.Item label="Kinh" value="kinh" />
                <Picker.Item label="Tày" value="tay" />
                <Picker.Item label="Thái" value="thai" />
                <Picker.Item label="Hoa" value="hoa" />
                <Picker.Item label="Khơ-me" value="khme" />
                <Picker.Item label="Mường" value="muong" />
                <Picker.Item label="Nùng" value="nung" />
              </Picker>
            </View>
            {/* Nghề nghiệp - chức vụ */}
            <View className="bg-[#F8FAFC] rounded-2xl px-4 py-2 mt-2">
              <Text className="text-xs text-[#94A3B8] pl-1">Nghề nghiệp - Chức vụ</Text>
              <Picker
                selectedValue={job}
                onValueChange={(itemValue) => setJob(itemValue)}
                className="text-base text-[#1E293B]"
              >
                <Picker.Item label="Khác - Khác" value="" />
                <Picker.Item label="Giáo viên" value="teacher" />
                <Picker.Item label="Bác sĩ" value="doctor" />
                <Picker.Item label="Kỹ sư" value="engineer" />
                <Picker.Item label="Nhân viên văn phòng" value="office_staff" />
                <Picker.Item label="Doanh nhân" value="business" />
                <Picker.Item label="Học sinh / Sinh viên" value="student" />
                <Picker.Item label="Khác" value="other" />
              </Picker>
            </View>
            {/* Địa chỉ */}
            <View className="bg-[#F8FAFC] rounded-2xl px-4 py-2 mt-2">
              <Text className="text-xs text-[#94A3B8] pl-1">Họ và tên</Text>
              <TextInput
                className="text-base text-[#1E293B]"
                value="45 Cục CS ĐKQL Cư Trú - DLQG Dân Cư VinHome 01"
                // onChangeText={handleChangePhone}
                placeholder="Nhập địa chỉ"
                placeholderTextColor="#A8B4C2"
                multiline={true}
              />
            </View>
            <View>
              <CustomButton title="Tiếp tục" onPress={() => { setIsValidated(true) }} />
            </View>
          </View>
        </ScrollView>
        <SuccessVerifyModal
          visible={isValidated}
          onClose={() => { setIsValidated(false) }}
          title="Xác thực thành công"
          sub={`Bạn đã có thể truy cập và sử dụng \ncác dịch vụ của EduPay`}
        />
      </KeyboardAvoidingView>

    </Layout >
  )
}