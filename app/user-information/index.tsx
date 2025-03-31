import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";
import { UserInfoField } from "@/components/UserInfoField";
import { Picker } from "@/components/Picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "@/types/user";
import { useUserStore } from "@/stores/useUserStore";
import { GenderCheckBox } from "@/components/GenderCheckBox";
import { Background } from "@/app/user-information/components/Background";
import useNavigation from "@/stores/useNavigation";
import { useAndroidKeyboardModule } from "@/hooks/useAndroidKeyboardModule";

// Temporary type definition for User
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1900 + 1 }, (_, i) =>
  (currentYear - i).toString()
);

export default function UserInformationScreen() {
  const setUser = useUserStore((state) => state.setUser);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthYear, setBirthYear] = useState<number | null>(null);
  const [gender, setGender] = useState<"MALE" | "FEMALE" | null>(null);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const { navigateTo } = useNavigation();
  const { setSoftInputMode } = useAndroidKeyboardModule();

  useEffect(() => {
    setSoftInputMode("resize");
    return () => setSoftInputMode("nothing");
  }, [])

  const handleYearSelect = (year: string) => {
    setBirthYear(Number(year));
    setShowYearPicker(false);
  };

  const handleWatchCompass = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Validate inputs
    if (!gender || !phoneNumber || !fullName || !birthYear) {
      // Show error message
      // alert("Please fill in all information.");
      setUser({
        gender: "MALE",
        phoneNumber: "0987654321",
        fullName: "Nguyễn Văn A",
        birthYear: 1990,
      });
      navigateTo("map");
      return;
    }

    // Create user object
    const user: User = {
      gender,
      phoneNumber,
      fullName,
      birthYear,
    };

    // Save user data to Zustand store
    setUser(user);

    navigateTo("map");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Background />
        <View style={styles.content}>
          <View style={styles.inputsContainer}>
            <UserInfoField
              title="Số điện thoại"
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={13}
            />

            <UserInfoField
              title="Họ và tên"
              onChangeText={setFullName}
              maxLength={30}
            />

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
            onPress={handleWatchCompass}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
});
