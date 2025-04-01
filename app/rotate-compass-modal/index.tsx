import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import { isNumberInRange } from "@/shared/validation";

interface RotateCompassModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (degree: number) => void;
}

export default function RotateCompassModal({
  isVisible,
  onClose,
  onConfirm
}: RotateCompassModalProps) {
  const [tempDegree, setTempDegree] = useState<number | null>(null);
  const handleSave = () => {
    if (tempDegree === null || !isNumberInRange(tempDegree, 0, 360)) {
      alert("Vui lòng nhập độ xoay từ 0 đến 360");
      return;
    }
    onConfirm(tempDegree);
    onClose();
  }
  
  useEffect(() => {
    if (!isVisible) {
      setTempDegree(null);
    }
  }, [isVisible])

  if (!isVisible) return null;
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Xoay la bàn</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập độ xoay"
            placeholderTextColor="rgba(123, 92, 38, 0.2)"
            onChangeText={(text) => setTempDegree(Number(text))}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>
              Huỷ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            disabled={!tempDegree}
            onPress={handleSave}
          >
            <Text
              style={[
                styles.buttonText,
                styles.confirmButtonText,
                !tempDegree && styles.disabledButtonText,
              ]}
            >
              Xác nhận
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    color: "#7B5C26",
    fontSize: 24,
    fontFamily: "Voltaire Regular",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#FEC41F",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 100,
    marginBottom: 12,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#7B5C26",
    fontSize: 16,
    fontFamily: "Voltaire Regular",
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  closeButtonText: {
    color: "#FEC41F",
    fontSize: 16,
    fontFamily: "Voltaire Regular",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    minWidth: 120,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Voltaire Regular",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FEC41F",
  },
  confirmButton: {
    backgroundColor: "#FEC41F",
  },
  cancelButtonText: {
    color: "#FEC41F",
  },
  confirmButtonText: {
    color: "#7B5C26",
  },
  disabledButtonText: {
    opacity: 0.5,
  },
  searchContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    paddingHorizontal: 12,
    color: "#7B5C26",
  },
});
