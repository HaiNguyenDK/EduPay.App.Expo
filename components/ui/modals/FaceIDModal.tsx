import { Modal, View, Text, Pressable, Image } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  title?: string;
  sub?: string;
  children?: React.ReactNode;
}

const FaceIDModal: React.FC<Props> = ({ visible, onClose, title, sub, children }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Nền mờ */}
      <Pressable
        className="flex-1 bg-black/50 items-center justify-center"
        onPress={onClose}
      >
        {/* Nội dung modal */}
        <Pressable
          className="bg-white w-80 p-6 rounded-3xl"
          onPress={(e) => e.stopPropagation()} // tránh tắt khi bấm bên trong
        >
          <View className="flex-row justify-center mb-3">
            <Image source={require("../../../assets/images/Frame.jpg")} />
          </View>

          {/* Tiêu đề */}
          {title ? (
            <Text className="text-2xl mb-3 text-center">
              {title}
            </Text>
          ) : (
            <Text className="text-2xl mb-3 text-center">
              Kích hoạt đăng nhập bằng FaceID?
            </Text>
          )}

          {sub ? (
            <Text className="text-xl font-semibold mb-3 text-center">
              {sub}
            </Text>
          ) : (
            <Text className="text-base mb-3 text-center">
              Sử dụng khuôn mặt để đăng nhập nhanh và an toàn hớn.
            </Text>
          )}

          {/* Nội dung modal */}
          <View className="mb-4">
            {children}
          </View>

          <View className="flex-row justify-end gap-4">
            <Pressable
              onPress={onClose}
            >
              <Text className="text-[#EA3E3E] text-center font-medium">
                Quay lại
              </Text>
            </Pressable>
            <Pressable
              onPress={onClose}
            >
              <Text className="text-[#EA3E3E] text-center font-medium">
                Đồng ý
              </Text>
            </Pressable>
          </View>

        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default FaceIDModal;