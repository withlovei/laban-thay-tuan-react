import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { screen } from "../constants/Dimensions";
import { IconBar } from "./ui/icons/IconBar";

interface NavigationBarProps {}

export const NavigationBar: FC<NavigationBarProps> = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconBar}
        onPress={() => {
          console.log("onpress");
        }}
      >
        <IconBar />
      </TouchableOpacity>
      <Text style={styles.title}>LA BÀN THẦY TUẤN</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#FEC41F",
    borderRadius: 50,
    marginHorizontal: 16,
    marginTop: 24,
  },
  iconBar: {
    position: "absolute",
    left: 0,
  },
  title: {
    color: "#7B5C26",
    fontSize: 21,
    fontFamily: "Voltaire Regular",
  },
});
