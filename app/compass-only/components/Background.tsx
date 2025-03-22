import { screen } from "@/constants/Dimensions";
import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Background = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={[StyleSheet.absoluteFillObject, { top }]}
      pointerEvents="none"
    >
      <Image
        source={require("@/assets/images/compass-only/left_dragon.png")}
        style={styles.leftDragon}
      />
      <Image
        source={require("@/assets/images/compass-only/right_dragon.png")}
        style={styles.rightDragon}
      />
      <Image
        source={require("@/assets/images/compass-only/footer.png")}
        style={styles.footer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  leftDragon: {
    position: "absolute",
    top: 102,
    left: 0,
    width: 161,
    height: 125,
  },
  rightDragon: {
    position: "absolute",
    top: 102,
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
});
