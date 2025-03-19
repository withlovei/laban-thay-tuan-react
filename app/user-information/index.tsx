import React, { useState, useEffect } from "react";
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
import { GenderCheckBox } from "@/app/user-information/components/GenderCheckBox";
import { UserInfoField } from "@/app/user-information/components/UserInfoField";
import { YearPicker } from "@/app/user-information/components/YearPicker";
import { RootStackParamList } from "../AppNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextStyles } from "../../constants/TextStyles";

// Define the navigation prop type
type UserInformationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "UserInformation"
>;

// Props interface
interface UserInformationScreenProps {
  navigation: UserInformationScreenNavigationProp;
}

// Temporary type definition for User
interface User {
  gender: "MALE" | "FEMALE" | null;
  phoneNumber: string;
  fullName: string;
  birthYear: number | null;
}

export default function UserInformationScreen({
  navigation,
}: UserInformationScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthYear, setBirthYear] = useState<number | null>(null);
  const [gender, setGender] = useState<"MALE" | "FEMALE" | null>(null);
  const [showYearPicker, setShowYearPicker] = useState(false);

  // Hide header on component mount
  useEffect(() => {
    // Additional setup if needed
  }, []);

  const handleYearSelect = (year: number) => {
    setBirthYear(year);
    setShowYearPicker(false);
  };

  const handleWatchCompass = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Validate inputs
    if (!gender || !phoneNumber || !fullName || !birthYear) {
      // Show error message
      alert("Please fill in all information.");
      return;
    }

    // Create user object
    const user: User = {
      gender,
      phoneNumber,
      fullName,
      birthYear,
    };

    // Save user data (would typically use a state management solution)
    console.log("User data:", user);

    // Navigate to home screen using react-navigation
    navigation.navigate("Tabs");
  };

  return (
    <>
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
                <Text style={styles.title}>
                  LA BÀN THẦY TUẤN
                </Text>
              </View>

              <View style={styles.inputsContainer}>
                <UserInfoField
                  title="Phone Number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  maxLength={13}
                />

                <UserInfoField
                  title="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                  maxLength={30}
                />

                <GenderCheckBox
                  selectedGender={gender}
                  onSelectGender={setGender}
                />

                <UserInfoField
                  title="Year of Birth"
                  value={birthYear ? birthYear.toString() : ""}
                  onPress={() => setShowYearPicker(true)}
                  isDropdown
                  editable={false}
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleWatchCompass}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>COMPASS</Text>
              </TouchableOpacity>
            </View>

            {showYearPicker && (
              <YearPicker
                initialValue={birthYear}
                onSelectYear={handleYearSelect}
                onClose={() => setShowYearPicker(false)}
              />
            )}
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D4001D",
  },
  backgroundImage: {
    width: "100%",
    // height: 810,
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
    marginBottom: 50,
  },
  logo: {
    height: 248,
    width: 248,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FAFAC3",
    fontFamily: "IronGothic"
  },
  inputsContainer: {
    width: "80%",
    marginBottom: 50,
    gap: 20,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#D4001D",
    // marginBottom: 50,
    width: 150,
  },
  buttonText: {
    color: "#D4001D",
    fontWeight: "bold",
    fontSize: 16,
  },
});
