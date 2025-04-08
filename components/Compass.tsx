import { User } from "@/types/user";
import { Image, ImageSource } from "expo-image";
import { FC, useMemo } from "react";

type CompassProps = Pick<User, "gender" | "birthYear"> & {
  full?: boolean;
  color?: string;
  map?: boolean;
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

const CompassComponentsForImage: CompassComponents = {
  MALE: {
    regular: {
      0: require("@/assets/images/compass/laban_khon_tamdo.png"),
      1: require("@/assets/images/compass/laban_kham_tamdo.png"),
      2: require("@/assets/images/compass/laban_ly_tamdo.png"),
      3: require("@/assets/images/compass/laban_cans_tamdo.png"),
      4: require("@/assets/images/compass/laban_doai_tamdo.png"),
      5: require("@/assets/images/compass/laban_canf_tamdo.png"),
      6: require("@/assets/images/compass/laban_khon_tamdo.png"),
      7: require("@/assets/images/compass/laban_ton_tamdo.png"),
      8: require("@/assets/images/compass/laban_chan_tamdo.png"),
    },
    full: {
      0: require("@/assets/images/compass/laban_khon_full.png"),
      1: require("@/assets/images/compass/laban_kham_full.png"),
      2: require("@/assets/images/compass/laban_ly_full.png"),
      3: require("@/assets/images/compass/laban_cans_full.png"),
      4: require("@/assets/images/compass/laban_doai_full.png"),
      5: require("@/assets/images/compass/laban_canf_full.png"),
      6: require("@/assets/images/compass/laban_khon_full.png"),
      7: require("@/assets/images/compass/laban_ton_full.png"),
      8: require("@/assets/images/compass/laban_chan_full.png"),
    },
  },
  FEMALE: {
    regular: {
      0: require("@/assets/images/compass/laban_ton_tamdo.png"),
      1: require("@/assets/images/compass/laban_cans_tamdo.png"),
      2: require("@/assets/images/compass/laban_canf_tamdo.png"),
      3: require("@/assets/images/compass/laban_doai_tamdo.png"),
      4: require("@/assets/images/compass/laban_cans_tamdo.png"),
      5: require("@/assets/images/compass/laban_ly_tamdo.png"),
      6: require("@/assets/images/compass/laban_kham_tamdo.png"),
      7: require("@/assets/images/compass/laban_khon_tamdo.png"),
      8: require("@/assets/images/compass/laban_chan_tamdo.png"),
    },
    full: {
      0: require("@/assets/images/compass/laban_ton_full.png"),
      1: require("@/assets/images/compass/laban_cans_full.png"),
      2: require("@/assets/images/compass/laban_canf_full.png"),
      3: require("@/assets/images/compass/laban_doai_full.png"),
      4: require("@/assets/images/compass/laban_cans_full.png"),
      5: require("@/assets/images/compass/laban_ly_full.png"),
      6: require("@/assets/images/compass/laban_kham_full.png"),
      7: require("@/assets/images/compass/laban_khon_full.png"),
      8: require("@/assets/images/compass/laban_chan_full.png"),
    },
  },
};

const CompassComponentForMap: CompassComponents = {
  MALE: {
    regular: {
      0: require("@/assets/images/compass-map/laban_khon_tamdo.png"),
      1: require("@/assets/images/compass-map/laban_kham_tamdo.png"),
      2: require("@/assets/images/compass-map/laban_ly_tamdo.png"),
      3: require("@/assets/images/compass-map/laban_cans_tamdo.png"),
      4: require("@/assets/images/compass-map/laban_doai_tamdo.png"),
      5: require("@/assets/images/compass-map/laban_canf_tamdo.png"),
      6: require("@/assets/images/compass-map/laban_khon_tamdo.png"),
      7: require("@/assets/images/compass-map/laban_ton_tamdo.png"),
      8: require("@/assets/images/compass-map/laban_chan_tamdo.png"),
    },
    full: {
      0: require("@/assets/images/compass-map/laban_khon_full.png"),
      1: require("@/assets/images/compass-map/laban_kham_full.png"),
      2: require("@/assets/images/compass-map/laban_ly_full.png"),
      3: require("@/assets/images/compass-map/laban_cans_full.png"),
      4: require("@/assets/images/compass-map/laban_doai_full.png"),
      5: require("@/assets/images/compass-map/laban_canf_full.png"),
      6: require("@/assets/images/compass-map/laban_khon_full.png"),
      7: require("@/assets/images/compass-map/laban_ton_full.png"),
      8: require("@/assets/images/compass-map/laban_chan_full.png"),
    },
  },
  FEMALE: {
    regular: {
      0: require("@/assets/images/compass-map/laban_ton_tamdo.png"),
      1: require("@/assets/images/compass-map/laban_cans_tamdo.png"),
      2: require("@/assets/images/compass-map/laban_canf_tamdo.png"),
      3: require("@/assets/images/compass-map/laban_doai_tamdo.png"),
      4: require("@/assets/images/compass-map/laban_cans_tamdo.png"),
      5: require("@/assets/images/compass-map/laban_ly_tamdo.png"),
      6: require("@/assets/images/compass-map/laban_kham_tamdo.png"),
      7: require("@/assets/images/compass-map/laban_khon_tamdo.png"),
      8: require("@/assets/images/compass-map/laban_chan_tamdo.png"),
    },
    full: {
      0: require("@/assets/images/compass-map/laban_ton_full.png"),
      1: require("@/assets/images/compass-map/laban_cans_full.png"),
      2: require("@/assets/images/compass-map/laban_canf_full.png"),
      3: require("@/assets/images/compass-map/laban_doai_full.png"),
      4: require("@/assets/images/compass-map/laban_cans_full.png"),
      5: require("@/assets/images/compass-map/laban_ly_full.png"),
      6: require("@/assets/images/compass-map/laban_kham_full.png"),
      7: require("@/assets/images/compass-map/laban_khon_full.png"),
      8: require("@/assets/images/compass-map/laban_chan_full.png"),
    },
  },
};
/**
 * This component use Crossfade strategy to render UI
 */
export const Compass: FC<CompassProps> = ({
  gender,
  birthYear,
  full = false,
  map = false,
}) => {
  if (birthYear === null || gender === null)
    return (
      <>
        <Image
          source={require("@/assets/images/compass/laban_default.png")}
          style={{ width: "100%", height: "100%" }}
          cachePolicy={"memory"}
        />
      </>
    );

  const remainder = useMemo(() => {
    const sum = birthYear
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit), 0);
    return sum % 9;
  }, [birthYear]);

  const CompassComponent = map
    ? CompassComponentForMap
    : CompassComponentsForImage;
  return (
    <>
      <Image
        source={CompassComponent[gender][full ? "full" : "regular"][remainder]}
        style={{ width: "100%", height: "100%" }}
        cachePolicy={"memory"}
      />
    </>
  );
};
