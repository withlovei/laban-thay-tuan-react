import { User } from "@/types/user";
import { FC, useMemo, useEffect } from "react";
import { KhonFull } from "./ui/compass/khon_full";
import { TonFull } from "./ui/compass/ton_full";
import { Khon } from "./ui/compass/khon";
import { Ton } from "./ui/compass/ton";
import { ChanFull } from "./ui/compass/chan_full";
import { Chan } from "./ui/compass/chan";
import { CansFull } from "./ui/compass/cans_full";
import { Cans } from "./ui/compass/cans";
import { Kham } from "./ui/compass/kham";
import { KhamFull } from "./ui/compass/kham_full";
import { LyFull } from "./ui/compass/ly_full";
import { CanFull } from "./ui/compass/can_full";
import { Ly } from "./ui/compass/ly";
import { Can } from "./ui/compass/can";
import { DoaiFull } from "./ui/compass/doai_full";
import { Doai } from "./ui/compass/doai";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type CompassProps = Pick<User, "gender" | "birthYear"> & { full?: boolean; color?: string };

type CompassComponent = ({ textColor }: { textColor: string }) => JSX.Element;
type CompassMapping = {
  [key: number]: CompassComponent;
};

type GenderMapping = {
  full: CompassMapping;
  regular: CompassMapping;
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
  color = "#231f20"
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
    position: 'absolute',
    width: "100%",
    height: "100%"
  }));

  const regularStyle = useAnimatedStyle(() => ({
    opacity: regularOpacity.value,
    position: 'absolute',
    width: "100%",
    height: "100%"
  }));

  // Define component mappings
  const compassComponents: CompassComponents = {
    MALE: {
      full: {
        0: KhonFull,
        1: KhamFull,
        2: LyFull,
        3: CansFull,
        4: DoaiFull,
        5: CanFull,
        6: KhonFull,
        7: TonFull,
        8: ChanFull,
      },
      regular: {
        0: Khon,
        1: Kham,
        2: Ly,
        3: Cans,
        4: Doai,
        5: Can,
        6: Khon,
        7: Ton,
        8: Chan,
      },
    },
    FEMALE: {
      full: {
        0: TonFull,
        1: CansFull,
        2: CanFull,
        3: DoaiFull,
        4: CansFull,
        5: LyFull,
        6: KhamFull,
        7: KhonFull,
        8: ChanFull,
      },
      regular: {
        0: Ton,
        1: Cans,
        2: Can,
        3: Doai,
        4: Cans,
        5: Ly,
        6: Kham,
        7: Khon,
        8: Chan,
      },
    },
  };

  const FullComponent = compassComponents[gender].full[remainder];
  const RegularComponent = compassComponents[gender].regular[remainder];

  return (
    <>
      <Animated.View style={regularStyle}>
        <RegularComponent textColor={color} />
      </Animated.View>
      <Animated.View style={fullStyle}>
        <FullComponent textColor={color} />
      </Animated.View>
    </>
  );
};
