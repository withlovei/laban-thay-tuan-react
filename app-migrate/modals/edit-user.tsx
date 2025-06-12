import { Background } from "@/app/edit-user-modal/components/Background";
import { GenderCheckBox } from "@/components/GenderCheckBox";
import { Picker } from "@/components/Picker";
import { IconContainer } from "@/components/ui/IconContainer";
import { IconClose } from "@/components/ui/icons/IconClose";
import { UserInfoField } from "@/components/UserInfoField";
import { screen } from "@/constants/Dimensions";
import { useUserStore } from "@/stores/useUserStore";
import { User } from "@/types/user";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Temporary type definition for User
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1900 + 1 }, (_, i) =>
  (currentYear - i).toString()
);
interface EditUserModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function EditUserModal({
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
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ minHeight: screen.height }}
        showsVerticalScrollIndicator={false}
      >
        <Background />
        <IconContainer onPress={onClose} style={styles.closeButton}>
          <IconClose />
        </IconContainer>
        <View style={styles.content}>
          <View style={styles.inputsContainer}>
            <UserInfoField
              title="Năm sinh"
              placeholder="Chọn năm sinh"
              value={birthYear ? birthYear.toString() : ""}
              onPress={() => setShowYearPicker(true)}
              isDropdown
              editable={false}
            />

            <GenderCheckBox
              selectedGender={gender}
              onSelectGender={setGender}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>XEM LA BÀN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: "#C81B22",
    zIndex: 10,
    elevation: 10,
  },
  backgroundImage: {
    width: "100%",
  },
  content: {
    marginTop: 392,
    alignItems: "center",
    marginBottom: 142,
  },
  inputsContainer: {
    width: "80%",
    marginBottom: 16,
    gap: 12,
  },
  button: {
    backgroundColor: "#FEC41F",
    paddingVertical: 16,
    borderRadius: 100,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#7B5C26",
    fontSize: 18,
    fontFamily: "Roboto Condensed Bold",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 16,
    backgroundColor: "transparent",
  },
});
