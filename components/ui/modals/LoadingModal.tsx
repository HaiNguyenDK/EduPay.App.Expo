import { Modal, Pressable, View, Text, Image, SafeAreaView } from "react-native";
import Spinner from "../Spinner";

interface Props {
  visible: boolean;
  onClose?: () => void;
  title?: string;
  sub?: string;
  children?: React.ReactNode;
}

const LoadingModal: React.FC<Props> = ({ visible, onClose, title, sub, children }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable className="absolute inset-0 flex-1 bg-black/30 items-center justify-center">
        <Spinner size={40} strokeWidth={5} />
      </Pressable>
    </Modal>
  );
}

export default LoadingModal;