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
      // alert("Please fill in all information.");
      // return;
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
    navigation.navigate("Map");
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
                {/* 
                <GenderCheckBox
                  selectedGender={gender}
                  onSelectGender={setGender}
                /> */}

                <UserInfoField
                  title="Năm sinh"
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
                <Text style={styles.buttonText}>XEM LA BÀN</Text>
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
