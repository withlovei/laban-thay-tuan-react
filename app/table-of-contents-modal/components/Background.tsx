import { screen } from "@/constants/Dimensions";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export const Background = () => {
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <Image
        source={require("@/assets/images/footer.png")}
        style={styles.footer}
      />
      <Image
        source={require("@/assets/images/table-of-contents/avt.png")}
        style={styles.avt}
      />
      <Text style={styles.title}>LA BÀN THẦY TUẤN</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 66,
    width: screen.width,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  avt: {
    height: 180,
    width: 180,
    position: "absolute",
    bottom: 148,
    left: screen.width / 2 - 90,
  },
  title: {
    fontSize: 26,
    fontFamily: "UTM Impact",
    color: "#EAD196",
    position: "absolute",
    bottom: 96,
    width: screen.width,
    textAlign: "center",
    left: 0
  },
});

