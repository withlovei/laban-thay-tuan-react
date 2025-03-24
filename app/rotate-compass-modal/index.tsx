import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/types/navigation";
import { UserInfoField } from "@/components/UserInfoField";
import { RouteProp } from "@react-navigation/native";

interface RotateCompassModalProps {
  navigation: StackNavigationProp<
    RootStackParamList,
    "RotateCompassModal"
  >;
  route: RouteProp<RootStackParamList, "RotateCompassModal">;
}

export default function RotateCompassModal({
  navigation,
  route,
}: RotateCompassModalProps) {
  const [tempDegree, setTempDegree] = useState<number | null>(null);

  const handleRotateCompass = () => {
    if (tempDegree) {
      navigation.popTo(route.params.from, {
        degree: tempDegree,
      } as any);
    }
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Xoay la bàn</Text>

        <View style={styles.inputContainer}>
          <UserInfoField
            title="Độ xoay"
            value={tempDegree ? tempDegree.toString() : ""}
            onChangeText={(text) => setTempDegree(Number(text))}
            keyboardType="numeric"
            maxLength={30}
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleRotateCompass}
        >
          <Text style={styles.saveButtonText}>XÁC NHẬN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeButtonText}>ĐÓNG</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
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
