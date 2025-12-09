import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Modal, Pressable, View, Image, Text } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  title?: string;
  sub?: string;
  children?: React.ReactNode;
}

const SuccessVerifyModal: React.FC<Props> = ({
  visible,
  onClose,
  title,
  sub,
  children,
}) => {

  const [count, setCount] = useState<number>(5);

  useEffect(() => {
    if (!visible) return
    if (!children) {
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            router.push("/(tabs)"); //update đổi sang home nha
            onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/50 items-center justify-center"
        onPress={onClose}>
        <Pressable
          className="bg-white w-[350px] p-6 rounded-xl overflow-hidden flex flex-col gap-4"
          onPress={(e) => e.stopPropagation()}
        >
          <View className="absolute -top-5 flex-row justify-center mb-3 -z-10">
            <Image source={require("../../../assets/images/Pattern.png")} />
          </View>
          <View className="flex-col gap-6 items-center align-middle">
            <Image source={require("../../../assets/images/Filled.png")} className="mt-10" />
            <View className="flex flex-col gap-2 justify-center text-center items-center">
              <Text className="font-medium text-gray-600 text-2xl">{title}</Text>
              <Text className="text-center text-[#334155]">{sub}</Text>
              {!children ? (
                <Text className="text-center text-sm">Hệ thống được chuyển hướng đến trang chủ trong
                  <Text className="text-[#2B61E8]"> {count ?? 0}s</Text>
                </Text>
              ) : null}
            </View>
          </View>
          <View>
            {children}
          </View>
        </Pressable>
      </Pressable>

    </Modal>
  );
}

export default SuccessVerifyModal;