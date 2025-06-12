import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
interface ImagePickerModalProps {
  setUri: (uri: string) => void;
  isVisible: boolean;
  onClose: () => void;
}

export default function ImagePickerModal({
  setUri,
  isVisible,
  onClose,
}: ImagePickerModalProps) {
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
          {/* <TouchableOpacity onPress={onClose}>
            <IconContainer>
              <IconClose />
            </IconContainer>
          </TouchableOpacity> */}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCameraLaunch}>
          <Text style={styles.buttonText}>Mở máy ảnh</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleGalleryLaunch}>
          <Text style={styles.buttonText}>Chọn từ thư viện</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onClose}
        >
          <Text style={[styles.buttonText, styles.cancelButtonText]}>Huỷ</Text>
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
    color: "#7B5C26",
    fontSize: 24,
    fontFamily: "Roboto Condensed",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    minWidth: 120,
    alignItems: "center",
    backgroundColor: "#FEC41F",
    marginBottom: 12,
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FEC41F",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#7B5C26",
    fontFamily: "Roboto Condensed",
  },
  cancelButtonText: {
    color: "#FEC41F",
  },
});
