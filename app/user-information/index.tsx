import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Haptics from "expo-haptics";
import { UserInfoField } from "@/components/UserInfoField";
import { Picker } from "@/components/Picker";
import { RootStackParamList } from "../AppNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "@/types/user";
import { useUserStore } from "@/stores/useUserStore";
import { GenderCheckBox } from "@/components/GenderCheckBox";

// Temporary type definition for User
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1900 + 1 }, (_, i) =>
  (currentYear - i).toString()
);

type UserInformationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "UserInformation"
>;

interface UserInformationScreenProps {
  navigation: UserInformationScreenNavigationProp;
}

export default function UserInformationScreen({
  navigation,
}: UserInformationScreenProps) {
  const setUser = useUserStore((state) => state.setUser);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthYear, setBirthYear] = useState<number | null>(null);
  const [gender, setGender] = useState<"MALE" | "FEMALE" | null>(null);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const handleYearSelect = (year: string) => {
    setBirthYear(Number(year));
    setShowYearPicker(false);
  };

  const handleWatchCompass = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Validate inputs
    if (!gender || !phoneNumber || !fullName || !birthYear) {
      // Show error message
      alert("Please fill in all information.");
      // setUser({
      //   gender: "MALE",
      //   phoneNumber: "0987654321",
      //   fullName: "Nguyễn Văn A",
      //   birthYear: 1990,
      // });
      // navigation.navigate("Map");
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

    navigation.navigate("Map");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require("@/assets/images/user-information/background.png")}
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}
        >
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                source={require("@/assets/images/user-information/avatar_shadow.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.title}>LA BÀN THẦY TUẤN</Text>
            </View>

            <View style={styles.inputsContainer}>
              <UserInfoField
                title="Số điện thoại"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={13}
              />

              <UserInfoField
                title="Họ và tên"
                value={fullName}
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

          {showYearPicker && (
            <Picker
              initialValue={birthYear?.toString()}
              onSelectValue={handleYearSelect}
              onClose={() => setShowYearPicker(false)}
              data={YEARS}
              title="Năm sinh"
            />
          )}
        </ImageBackground>
      </ScrollView>
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
  backgroundImageStyle: {
    opacity: 1,
    resizeMode: "stretch",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingTop: 93,
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 18,
  },
  logo: {
    height: 248,
    width: 248,
  },
  title: {
    fontSize: 32,
    fontFamily: "UTM Iron Gothic",
    color: "#FEC41F",
    marginTop: -5,
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
    marginBottom: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#7B5C26",
    fontSize: 16,
    fontFamily: "Voltaire Regular",
  },
});
