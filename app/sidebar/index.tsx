import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../AppNavigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Sidebar() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require("@/assets/images/side-bar/background.png")}
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}
        ></ImageBackground>
      </ScrollView>
    </View>
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
    // resizeMode: "stretch",
  },
  scrollContent: {
    flexGrow: 1,
    // backgroundColor: "#C81B22",
  },
  content: {
    flex: 1,
    paddingTop: 93,
    alignItems: "center",
  },
});
