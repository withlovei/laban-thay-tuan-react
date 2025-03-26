import { User } from "@/types/user";
import { Image, ImageSource } from "expo-image";
import { FC, useMemo, useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type CompassProps = Pick<User, "gender" | "birthYear"> & {
  full?: boolean;
  color?: string;
};

type GenderMapping = {
  full: CompassMapping;
  regular: CompassMapping;
};

type CompassMapping = {
  [key: number]: ImageSource;
};

type CompassComponents = {
  MALE: GenderMapping;
  FEMALE: GenderMapping;
};

/**
 * This component use Crossfade strategy to render UI
 */
export const Compass: FC<CompassProps> = ({
  gender,
  birthYear,
  full = false,
  color = "#231f20",
}) => {
  if (birthYear === null || gender === null) return null;

  const remainder = useMemo(() => {
    const sum = birthYear
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit), 0);
    return sum % 9;
  }, [birthYear]);

  const fullOpacity = useSharedValue(full ? 1 : 0);
  const regularOpacity = useSharedValue(full ? 0 : 1);

  useEffect(() => {
    fullOpacity.value = withTiming(full ? 1 : 0, { duration: 500 });
    regularOpacity.value = withTiming(full ? 0 : 1, { duration: 500 });
  }, [full]);

  const fullStyle = useAnimatedStyle(() => ({
    opacity: fullOpacity.value,
    position: "absolute",
    width: "100%",
    height: "100%",
  }));

  const regularStyle = useAnimatedStyle(() => ({
    opacity: regularOpacity.value,
    position: "absolute",
    width: "100%",
    height: "100%",
  }));

  // Define component mappings
  // const compassComponents: CompassComponents = {
  //   MALE: {
  //     regular: {
  //       0: require("@/assets/images/compass/laban_khon.png"),
  //       1: require("@/assets/images/compass/laban_kham.png"),
  //       2: require("@/assets/images/compass/laban_ly.png"),
  //       3: require("@/assets/images/compass/laban_cans.png"),
  //       4: require("@/assets/images/compass/laban_doai.png"),
  //       5: require("@/assets/images/compass/laban_canf.png"),
  //       6: require("@/assets/images/compass/laban_khon.png"),
  //       7: require("@/assets/images/compass/laban_ton.png"),
  //       8: require("@/assets/images/compass/laban_chan.png"),
  //     },
  //     full: {
  //       0: require("@/assets/images/compass/laban_khon_full.png"),
  //       1: require("@/assets/images/compass/laban_kham_full.png"),
  //       2: require("@/assets/images/compass/laban_ly_full.png"),
  //       3: require("@/assets/images/compass/laban_cans_full.png"),
  //       4: require("@/assets/images/compass/laban_doai_full.png"),
  //       5: require("@/assets/images/compass/laban_canf_full.png"),
  //       6: require("@/assets/images/compass/laban_khon_full.png"),
  //       7: require("@/assets/images/compass/laban_ton_full.png"),
  //       8: require("@/assets/images/compass/laban_chan_full.png"),
  //     },
  //   },
  //   FEMALE: {
  //     regular: {
  //       0: require("@/assets/images/compass/laban_ton.png"),
  //       1: require("@/assets/images/compass/laban_cans.png"),
  //       2: require("@/assets/images/compass/laban_canf.png"),
  //       3: require("@/assets/images/compass/laban_doai.png"),
  //       4: require("@/assets/images/compass/laban_cans.png"),
  //       5: require("@/assets/images/compass/laban_ly.png"),
  //       6: require("@/assets/images/compass/laban_kham.png"),
  //       7: require("@/assets/images/compass/laban_khon.png"),
  //       8: require("@/assets/images/compass/laban_chan.png"),
  //     },
  //     full: {
  //       0: require("@/assets/images/compass/laban_ton_full.png"),
  //       1: require("@/assets/images/compass/laban_cans_full.png"),
  //       2: require("@/assets/images/compass/laban_canf_full.png"),
  //       3: require("@/assets/images/compass/laban_doai_full.png"),
  //       4: require("@/assets/images/compass/laban_cans_full.png"),
  //       5: require("@/assets/images/compass/laban_ly_full.png"),
  //       6: require("@/assets/images/compass/laban_kham_full.png"),
  //       7: require("@/assets/images/compass/laban_khon_full.png"),
  //       8: require("@/assets/images/compass/laban_chan_full.png"),
  //     },
  //   },
  // };

  // const fullSource = compassComponents[gender].full[remainder];
  // const regularSource = compassComponents[gender].regular[remainder];

  return (
    <>
      <Animated.View style={regularStyle}>
        <Image
          source={require("@/assets/images/compass/laban_cans_tamdo.png")}
          style={{ width: "100%", height: "100%" }}
          cachePolicy={"memory"}
        />
      </Animated.View>
      <Animated.View style={fullStyle}>
        <Image
          source={require("@/assets/images/compass/laban_cans_full.png")}
          style={{ width: "100%", height: "100%" }}
          cachePolicy={"memory"}
        />
      </Animated.View>
    </>
  );
};
