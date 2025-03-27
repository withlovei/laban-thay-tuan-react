import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Haptics from "expo-haptics";
import { UserInfoField } from "@/components/UserInfoField";
import { Picker } from "@/components/Picker";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { User } from "@/types/user";
import { useUserStore } from "@/stores/useUserStore";
import { GenderCheckBox } from "@/components/GenderCheckBox";
import { Background } from "@/app/user-information/components/Background";
import { RootStackParamList } from "@/types/navigation";
import { IconContainer } from "@/components/ui/IconContainer";
import { IconClose } from "@/components/ui/icons/IconClose";
import { screen } from "@/constants/Dimensions";

// Temporary type definition for User
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1900 + 1 }, (_, i) =>
  (currentYear - i).toString()
);

type EditUserModalNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EditUserModal"
>;

interface EditUserModalProps {
  navigation: EditUserModalNavigationProp;
}

export default function EditUserModal({ navigation }: EditUserModalProps) {
  const { top, bottom } = useSafeAreaInsets();
  const updateUser = useUserStore((state) => state.updateUser);
  const user = useUserStore((state) => state.user);
  const [birthYear, setBirthYear] = useState<number | null>(
    user?.birthYear ?? null
  );
  const [gender, setGender] = useState<"MALE" | "FEMALE" | null>(
    user?.gender ?? null
  );
  const [showYearPicker, setShowYearPicker] = useState(false);

  const handleYearSelect = (year: string) => {
    setBirthYear(Number(year));
    setShowYearPicker(false);
  };

  const handleSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!gender || !birthYear) {
      return;
    }

    const user: Partial<User> = {
      gender,
      birthYear,
    };

    updateUser(user);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ minHeight: screen.height - top - bottom }}
        showsVerticalScrollIndicator={false}
      >
        <Background />
        <IconContainer
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
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
            <Text style={styles.buttonText}>LƯU</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C81B22",
  },
  backgroundImage: {
    width: "100%",
  },
  content: {
    marginTop: 393,
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
    fontSize: 16,
    fontFamily: "Voltaire Regular",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 16,
    backgroundColor: "transparent",
  },
});
