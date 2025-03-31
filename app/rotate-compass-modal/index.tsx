import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { UserInfoField } from "@/components/UserInfoField";
import { isNumberInRange } from "@/shared/validation";

interface RotateCompassModalProps {
  isVisible: boolean;
  onClose: () => void;
  setDegree: (degree: { degree: number; isDone: boolean }) => void;
}

export default function RotateCompassModal({
  isVisible,
  onClose,
  setDegree,
}: RotateCompassModalProps) {
  const tempDegree = useRef<number | null>(null);
  const handleSave = () => {
    if (tempDegree.current === null || !isNumberInRange(tempDegree.current, 0, 360)) {
      alert("Vui lòng nhập độ xoay từ 0 đến 360");
      return;
    }
    if (tempDegree.current !== null) {
      setDegree({ degree: tempDegree.current, isDone: false });
      onClose();
    }
  }
  
  useEffect(() => {
    if (!isVisible) {
      tempDegree.current = null;
    }
  }, [isVisible])

  if (!isVisible) return null;
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Xoay la bàn</Text>

        <View style={styles.inputContainer}>
          <UserInfoField
            title="Độ xoay"
            onChangeText={(text) => (tempDegree.current = Number(text))}
            keyboardType="numeric"
            maxLength={30}
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>XÁC NHẬN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>ĐÓNG</Text>
        </TouchableOpacity>
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
    backgroundColor: "#C81B22",
    borderRadius: 16,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    color: "#FEC41F",
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
  },
});
