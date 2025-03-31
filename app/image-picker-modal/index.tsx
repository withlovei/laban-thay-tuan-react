import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { IconContainer } from "@/components/ui/IconContainer";
import { IconClose } from "@/components/ui/icons/IconClose";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
interface ImagePickerModalProps {
  setUri: (uri: string) => void;
  isVisible: boolean;
  onClose: () => void;
}

export default function ImagePickerModal({ setUri, isVisible, onClose }: ImagePickerModalProps) {
  const handleCameraLaunch = async () => {
    const result = await launchCamera({
      mediaType: "photo",
      quality: 1,
    });

    if (result.assets && result.assets[0]?.uri) {
      setUri(result.assets[0].uri);
      onClose();
    }
  };

  const handleGalleryLaunch = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 1,
    });

    if (result.assets && result.assets[0]?.uri) {
      setUri(result.assets[0].uri);
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Chọn ảnh</Text>
          <TouchableOpacity onPress={onClose}>
            <IconContainer>
              <IconClose />
            </IconContainer>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleCameraLaunch}
        >
          <Text style={styles.buttonText}>Mở máy ảnh</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleGalleryLaunch}
        >
          <Text style={styles.buttonText}>Chọn từ thư viện</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxWidth: 400,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#C81B22",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
}); 