import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useUserStore } from "@/stores/useUserStore";
import { GenderCheckBox } from "@/components/GenderCheckBox";
import { Picker } from "@/components/Picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/types/navigation";

type EditUserModalNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EditUserModal"
>;

interface EditUserModalProps {
  navigation: EditUserModalNavigationProp;
}

export default function EditUserModal({ navigation }: EditUserModalProps) {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [tempBirthYear, setTempBirthYear] = useState<number | null>(null);
  const [tempGender, setTempGender] = useState<"MALE" | "FEMALE" | null>(null);
  const [showYearPicker, setShowYearPicker] = useState(false);

  useEffect(() => {
    if (user) {
      setTempBirthYear(user.birthYear);
      setTempGender(user.gender);
    }
  }, [user]);

  const handleSaveUserInfo = () => {
    if (user && tempGender && tempBirthYear) {
      setUser({
        ...user,
        gender: tempGender,
        birthYear: tempBirthYear,
      });
      navigation.goBack();
    }
  };

  const handleYearSelect = (year: string) => {
    setTempBirthYear(Number(year));
    setShowYearPicker(false);
  };

  if (!user) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Chỉnh sửa thông tin</Text>
        
        <TouchableOpacity
          style={styles.yearPickerButton}
          onPress={() => setShowYearPicker(true)}
        >
          <Text style={styles.yearPickerButtonText}>
            {tempBirthYear ? `Năm sinh: ${tempBirthYear}` : "Chọn năm sinh"}
          </Text>
        </TouchableOpacity>

        <View style={styles.genderContainer}>
          <GenderCheckBox
            selectedGender={tempGender}
            onSelectGender={setTempGender}
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveUserInfo}
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

      {showYearPicker && (
        <Picker
          initialValue={tempBirthYear?.toString()}
          onSelectValue={handleYearSelect}
          onClose={() => setShowYearPicker(false)}
          data={Array.from(
            { length: new Date().getFullYear() - 1900 + 1 },
            (_, i) => (new Date().getFullYear() - i).toString()
          )}
          title="Năm sinh"
        />
      )}
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
  yearPickerButton: {
    backgroundColor: "rgba(254, 196, 31, 0.1)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D69C66",
    width: "100%",
    marginBottom: 16,
  },
  yearPickerButtonText: {
    color: "#FEC41F",
    fontSize: 16,
    fontFamily: "Voltaire Regular",
    textAlign: "center",
  },
  genderContainer: {
    width: "100%",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#FEC41F",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 100,
    marginBottom: 12,
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
}); 