import { screen } from "@/constants/Dimensions";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export const Background = () => {
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <Image
        source={require("@/assets/images/user-information/amulet.png")}
        style={styles.amulet}
      />
      <Image
        source={require("@/assets/images/user-information/left_dragon.png")}
        style={styles.leftDragon}
      />
      <Image
        source={require("@/assets/images/user-information/right_dragon.png")}
        style={styles.rightDragon}
      />
      <Image
        source={require("@/assets/images/footer.png")}
        style={styles.footer}
      />
      <Image
        source={require("@/assets/images/user-information/avatar_shadow.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>LA BÀN THẦY TUẤN</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  amulet: {
    height: 52,
    width: 104,
    position: "absolute",
    top: 0,
    left: screen.width / 2 - 52,
  },
  leftDragon: {
    position: "absolute",
    top: 43,
    left: 0,
    width: 161,
    height: 125,
  },
  rightDragon: {
    position: "absolute",
    top: 43,
    right: 0,
    width: 161,
    height: 125,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
    width: screen.width,
  },
  logo: {
    height: 164,
    width: 164,
    position: "absolute",
    top: 148,
    left: screen.width / 2 - 82,
  },
  title: {
    fontSize: 28,
    fontFamily: "UTM Impact",
    color: "#FEC41F",
    position: "absolute",
    top: 328,
    width: "100%",
    left: 0,
    textAlign: "center",
  },
});
