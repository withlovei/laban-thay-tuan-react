import React, { useEffect, useRef } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import CompassHeading from "react-native-compass-heading";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToggle } from "@/hooks/useToggle";
import { IconLock } from "@/components/ui/icons/IconLock";
import { screen } from "@/constants/Dimensions";
import { NavigationBar } from "@/components/NavigationBar";
import { IconContainer } from "@/components/ui/IconContainer";
import { IconEyeSlash } from "@/components/ui/icons/IconEyeSlash";
import { IconFlexStart } from "@/components/ui/icons/IconFlexStart";
import { IconEditDocument } from "@/components/ui/icons/IconEditDocument";
import { IconLockOpenRight } from "@/components/ui/icons/IconLockOpenRight";
import CompassHeadingUI from "@/components/ui/CompassHeading";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Slider from "@react-native-community/slider";
import { useUserStore } from "@/stores/useUserStore";
import { Compass } from "@/components/Compass";
import {
  getSpecialDirectionByCompassHeading,
  getStar,
  getStarMeaning,
  normalizeHeading,
} from "@/shared/compass";
import { getDirectionByCompassHeading } from "@/shared/compass";
import { mapGenderToText } from "@/shared/transform";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/types/navigation";
import { Background } from "@/app/compass-only/components/Background";
import { IconAdd } from "@/components/ui/icons/IconAdd";
import { ImagePicker, ImagePickerRef } from "@/components/ImagePicker";
import { RouteProp } from "@react-navigation/native";
import { IconSquare } from "@/components/ui/icons/IconSquare";
import { IconRotateRight } from "@/components/ui/icons/IconRotateRight";

type CompassOnlyScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CompassOnly"
>;

type CompassOnlyScreenRouteProp = RouteProp<RootStackParamList, "CompassOnly">;
interface CompassOnlyScreenProps {
  navigation: CompassOnlyScreenNavigationProp;
  route: CompassOnlyScreenRouteProp;
}

const COMPASS_SIZE = screen.width - 26;
const COMPASS_HEADING_SIZE = screen.width;
const MIN_SCALE = 0.5;
const MAX_SCALE = 2;

export default function CompassOnlyScreen({
  navigation,
  route,
}: CompassOnlyScreenProps) {
  const user = useUserStore((state) => state.user);
  const [isShowRect, toggleShowRect] = useToggle(true);
  const imagePickerRef = useRef<ImagePickerRef>(null);
  const compassStarMeaningTextRef = useRef<TextInput>(null);
  const compassHeading = useSharedValue(0);
  const compassScale = useSharedValue(1);
  const compassOpacity = useSharedValue(1);
  const {
    top: paddingTop,
    bottom: paddingBottom,
    left: paddingLeft,
    right: paddingRight,
  } = useSafeAreaInsets();
  const compassStyle = useAnimatedStyle(() => ({
    opacity: compassOpacity.value,
    transform: [
      { rotate: `${-compassHeading.value}deg` },
      { scale: compassScale.value },
    ],
  }));
  const updateCompassHeadingFnRef = useRef<(heading: number) => void>(() => {});
  const compassHeadingTextRef = useRef<TextInput>(null);
  const backCompassHeadingTextRef = useRef<TextInput>(null);

  const compassHeadingStyle = useAnimatedStyle(() => ({
    opacity: compassOpacity.value,
    transform: [{ scale: compassScale.value }],
    top:
    screen.height / 2 -
    COMPASS_HEADING_SIZE / 2 -
    7 * compassScale.value * (COMPASS_HEADING_SIZE / 404),
  }));
  const [isLockCompass, toggleLockCompass, setIsLockCompass] = useToggle(false);
  const [isFullCompass, toggleFullCompass] = useToggle(false);

  useEffect(() => {
    if (route.params?.degree) {
      setIsLockCompass(true);
      updateCompassHeading(route.params.degree, true);
    }
  }, [route.params?.degree]);

  useEffect(() => {
    const degree_update_rate = 0.001;

    CompassHeading.start(
      degree_update_rate,
      ({ heading }: { heading: number }) => {
        updateCompassHeadingFnRef.current(heading);
      }
    );
    return () => {
      CompassHeading.stop();
    };
  }, []);

  useEffect(() => {
    updateCompassHeadingFnRef.current = updateCompassHeading;
  }, [user?.gender, user?.birthYear]);

  useEffect(() => {
    if (isLockCompass) {
      updateCompassHeadingFnRef.current = () => {};
    } else {
      updateCompassHeadingFnRef.current = updateCompassHeading;
    }
  }, [isLockCompass]);

  const updateCompassHeading = (heading: number, animation: boolean = false) => {
    const direction = getDirectionByCompassHeading(heading);
    const specialDirection = getSpecialDirectionByCompassHeading(heading);
    compassHeadingTextRef.current?.setNativeProps({
      text: `Hướng ${specialDirection} ${heading.toFixed(3)}° ${direction}`,
    });

    const backHeading = normalizeHeading(heading + 180);
    const backDirection = getDirectionByCompassHeading(backHeading);
    const backSpecialDirection =
      getSpecialDirectionByCompassHeading(backHeading);
    const genderText = mapGenderToText(user?.gender);
    backCompassHeadingTextRef.current?.setNativeProps({
      text: `${genderText} - ${
        user?.birthYear
      }\nHướng ${backSpecialDirection} ${backHeading.toFixed(
        3
      )}° ${backDirection}`,
    });
    if (user) {
      const star = getStar(heading, user)
      if (star) {
        const starMeaning = getStarMeaning(star)
        compassStarMeaningTextRef.current?.setNativeProps({
          text: starMeaning,
        });
      }
    }

    const remapHeading = heading > 180 ? heading - 360 : heading;
    const roundedHeading = Number(remapHeading.toFixed(3));
    compassHeading.value = animation ? withTiming(roundedHeading, { duration: 500 }) : roundedHeading;
  };

  if (user === null) return null;

  return (
    <View style={styles.container}>
      <Background />
      <ImagePicker
        ref={imagePickerRef}
        style={[StyleSheet.absoluteFillObject, { top: paddingTop + 64 }]}
        from="CompassOnly"
        uri={route.params?.uri}
      />
      <View
        style={[
          styles.safeAreaView,
          { paddingTop, paddingLeft, paddingRight, paddingBottom },
        ]}
        pointerEvents="box-none"
      >
        <NavigationBar />
        {/* tool bar */}
        <View style={styles.toolBar}>
          <IconContainer
            onPress={() => {
              compassOpacity.value = withTiming(
                compassOpacity.value === 0 ? 1 : 0,
                { duration: 200 }
              );
            }}
          >
            <IconEyeSlash />
          </IconContainer>
          <IconContainer onPress={() => imagePickerRef.current?.showModal()}>
            <IconAdd />
          </IconContainer>
          <IconContainer onPress={toggleFullCompass}>
            <IconFlexStart />
          </IconContainer>
        </View>
        {/* compass description */}
        <View style={styles.topCompassDescription} pointerEvents="none">
          <TextInput
            ref={compassHeadingTextRef}
            style={styles.compassDescriptionText}
            editable={false}
            pointerEvents="none"
          />
        </View>
        <View style={styles.compassStarMeaning} pointerEvents="none">
          <TextInput
            ref={compassStarMeaningTextRef}
            style={styles.compassStarMeaningText}
            editable={false}
            multiline
          />
        </View>
        {/* back compass description */}
        <View style={styles.bottomCompassDescription} pointerEvents="none">
          <TextInput
            ref={backCompassHeadingTextRef}
            style={styles.compassDescriptionText}
            multiline
            editable={false}
          />
        </View>
        {/* footer bar */}
        <View style={styles.footerBar}>
          <IconContainer onPress={toggleShowRect}>
            <IconSquare />
          </IconContainer>
          <IconContainer onPress={toggleLockCompass}>
            {isLockCompass ? <IconLock /> : <IconLockOpenRight />}
          </IconContainer>
          <IconContainer onPress={() => navigation.navigate("EditUserModal")}>
            <IconEditDocument />
          </IconContainer>
          {isLockCompass && (
            <IconContainer
              onPress={() =>
                navigation.navigate("RotateCompassModal", {
                  from: "CompassOnly",
                })
              }
            >
              <IconRotateRight />
            </IconContainer>
          )}
        </View>
        {/* compass scale slider */}
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={MIN_SCALE}
            maximumValue={MAX_SCALE}
            value={1}
            onValueChange={(value: number) => {
              compassScale.value = value;
            }}
            minimumTrackTintColor="#7B5C26"
            maximumTrackTintColor="#FFFFFF"
            thumbTintColor="#7B5C26"
          />
        </View>
      </View>
      {/* compass */}
      <Animated.View
        style={[styles.compass, compassStyle]}
        pointerEvents="none"
      >
        <Compass
          gender={user?.gender}
          birthYear={user?.birthYear}
          full={isFullCompass}
        />
      </Animated.View>
      {/* compass heading */}
      <Animated.View
        pointerEvents="none"
        style={[styles.compassHeading, compassHeadingStyle]}
      >
        <CompassHeadingUI showRect={isShowRect} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEC41F",
  },
  map: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  compass: {
    position: "absolute",
    left: screen.width / 2 - COMPASS_SIZE / 2,
    top: screen.height / 2 - COMPASS_SIZE / 2,
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
    borderRadius: COMPASS_SIZE / 2,
    zIndex: 1,
  },
  compassHeading: {
    position: "absolute",
    left: screen.width / 2 - COMPASS_HEADING_SIZE / 2,
    width: COMPASS_HEADING_SIZE,
    height: COMPASS_HEADING_SIZE,
    zIndex: 1,
  },
  compassLogo: {
    position: "absolute",
    top: screen.height / 2 - 64 / 2,
    left: screen.width / 2 - 64 / 2,
    borderRadius: 32,
  },
  compassHeadingDesc: {
    position: "absolute",
    top: 100,
    width: screen.width / 2,
    left: screen.width / 4,
  },
  toolBar: {
    marginVertical: 8,
    marginHorizontal: 16,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    height: 32,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 8,
    color: "#7B5C26",
    fontSize: 14,
  },
  footerBar: {
    position: "absolute",
    width: screen.width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 8,
    bottom: 32,
  },
  topCompassDescription: {
    alignItems: "center",
    justifyContent: "center",
  },
  compassDescriptionText: {
    color: "#553D13",
    fontSize: 18,
    fontFamily: "Voltaire Regular",
    textAlign: "center",
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "transparent",
    zIndex: 2,
  },
  bottomCompassDescription: {
    alignItems: "center",
    justifyContent: "center",
    bottom: 80,
    position: "absolute",
    width: screen.width,
  },
  sliderContainer: {
    position: "absolute",
    bottom: 120,
    width: screen.width,
    paddingHorizontal: 20,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  imagePicker: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  compassStarMeaning: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
  },
  compassStarMeaningText: {
    color: "#553D13",
    fontSize: 18,
    fontFamily: "Voltaire Regular",
    textAlign: "center",
  },
});
