import { GenderCheckBox } from "@/components/GenderCheckBox";
import { Picker } from "@/components/Picker";
import { UserInfoField } from "@/components/UserInfoField";
import { useUserStore } from "@/stores/useUserStore";
import { User } from "@/types/user";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1900 + 1 }, (_, i) =>
  (currentYear - i).toString()
);

interface EditUserModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function EditUserV2Modal({
  isVisible,
  onClose,
}: EditUserModalProps) {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const [birthYear, setBirthYear] = useState<number | null>(
    user?.birthYear ?? null
  );
  const [gender, setGender] = useState<"MALE" | "FEMALE" | null>(
    user?.gender ?? null
  );
  const [showYearPicker, setShowYearPicker] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      resetState();
    }
  }, [isVisible]);

  const resetState = () => {
    setGender(user?.gender ?? null);
    setBirthYear(user?.birthYear ?? null);
    setShowYearPicker(false);
  };

  const handleYearSelect = (year: string) => {
    setBirthYear(Number(year));
    setShowYearPicker(false);
  };

  const handleSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!gender || !birthYear) {
      return;
    }

    const user: User = {
      gender,
      birthYear,
    };

    setUser(user);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Thông tin người dùng</Text>

        <View style={styles.inputsContainer}>
          <UserInfoField
            title="Năm sinh"
            placeholder="Chọn năm sinh"
            value={birthYear ? birthYear.toString() : ""}
            onPress={() => setShowYearPicker(true)}
            isDropdown
            editable={false}
          />

          <GenderCheckBox selectedGender={gender} onSelectGender={setGender} />
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
            disabled={!gender || !birthYear}
            onPress={handleSave}
          >
            <Text
              style={[
                styles.buttonText,
                styles.confirmButtonText,
                (!gender || !birthYear) && styles.disabledButtonText,
              ]}
            >
              XEM LA BÀN
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {showYearPicker && (
        <Picker
          initialValue={birthYear?.toString()}
          onSelectValue={handleYearSelect}
          onClose={() => setShowYearPicker(false)}
          data={YEARS}
          title="Năm sinh"
        />
      )}
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
    fontFamily: "Roboto Condensed",
    marginBottom: 20,
  },
  inputsContainer: {
    width: "100%",
    marginBottom: 20,
    gap: 12,
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
    fontFamily: "Roboto Condensed",
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
});
