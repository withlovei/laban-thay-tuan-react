import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToggle } from "@/hooks/useToggle";
import { IconLock } from "@/components/ui/icons/IconLock";
import { screen, SLIDER_HEIGHT, SLIDER_WIDTH } from "@/constants/Dimensions";
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
import { Background } from "@/app/compass-only/components/Background";
import { IconAdd } from "@/components/ui/icons/IconAdd";
import { ImagePicker } from "@/components/ImagePicker";
import { IconRotateRight } from "@/components/ui/icons/IconRotateRight";
import { isNumberFinite, isNumberInRange } from "@/shared/validation";
import { ScreenPlaceholder } from "@/components/ScreenPlaceholder";
import { compassService } from "@/services/compass";
import { useModal } from "@/hooks/useModal";
import RotateCompassModal from "@/app/rotate-compass-modal";
import EditUserModal from "@/app/edit-user-modal";
import ImagePickerModal from "@/app/image-picker-modal";

const COMPASS_SIZE = screen.width - 26;
const COMPASS_HEADING_SIZE = screen.width;
const MIN_SCALE = 0.5;
const MAX_SCALE = 2;

export default function CompassOnlyScreen() {
  const user = useUserStore((state) => state.user);
  const [isShowRect, toggleShowRect] = useToggle(true);
  const compassStarMeaningTextRef = useRef<TextInput>(null);
  const homeDirectionTextRef = useRef<TextInput>(null);
  const compassHeading = useSharedValue(0);
  const compassScale = useSharedValue(1);
  const compassOpacity = useSharedValue(1);
  const [uri, setUri] = useState<string | null>(null);
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
  const {
    isVisible: isVisibleRotateCompass,
    onClose: onCloseRotateCompass,
    onOpen: onOpenRotateCompass,
  } = useModal();
  const {
    isVisible: isVisibleImagePicker,
    onClose: onCloseImagePicker,
    onOpen: onOpenImagePicker,
  } = useModal();
  const {
    isVisible: isVisibleEditUser,
    onClose: onCloseEditUser,
    onOpen: onOpenEditUser,
  } = useModal();
  const [rotate, setRotate] = useState({ degree: 0, isDone: true });
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
    if (!rotate.isDone && isNumberFinite(rotate.degree)) {
      setIsLockCompass(true);
    }
  }, [rotate]);

  useEffect(() => {
    compassService.subscribe((heading: number) => {
      updateCompassHeadingFnRef.current(heading);
    });
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
    if (!rotate.isDone && isNumberFinite(rotate.degree) && isLockCompass) {
      updateCompassHeading(rotate.degree, true);
      setRotate({ degree: 0, isDone: true });
    }
  }, [isLockCompass, rotate]);

  const updateCompassHeading = (
    heading: number,
    animation: boolean = false
  ) => {
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
      const star = getStar(heading, user);
      if (star) {
        const starMeaning = getStarMeaning(star);
        compassStarMeaningTextRef.current?.setNativeProps({
          text: starMeaning,
        });
      }
    }

    const forwardHeading = normalizeHeading(heading);
    if (isNumberInRange(forwardHeading, 141, 144)) {
      homeDirectionTextRef.current?.setNativeProps({
        text: "Tiểu không vong",
      });
    } else if (isNumberInRange(forwardHeading, 154.5, 160.5)) {
      homeDirectionTextRef.current?.setNativeProps({
        text: "Đại không vong",
      });
    } else {
      homeDirectionTextRef.current?.setNativeProps({
        text: "",
      });
    }

    const remapHeading = heading > 180 ? heading - 360 : heading;
    const roundedHeading = Number(remapHeading.toFixed(3));
    compassHeading.value = animation
      ? withTiming(roundedHeading, { duration: 500 })
      : roundedHeading;
  };

  if (user === null) return <ScreenPlaceholder />;

  return (
    <View style={styles.container}>
      <Background />
      {uri && (
        <ImagePicker
          style={[StyleSheet.absoluteFillObject, { top: paddingTop + 64 }]}
          uri={uri}
        />
      )}
      <View
        style={[
          styles.safeAreaView,
          { paddingTop, paddingLeft, paddingRight, paddingBottom },
        ]}
        pointerEvents="box-none"
      >
        <RotateCompassModal
          isVisible={isVisibleRotateCompass}
          onClose={onCloseRotateCompass}
          onConfirm={(degree) => setRotate({ degree, isDone: false })}
        />
        <EditUserModal
          isVisible={isVisibleEditUser}
          onClose={onCloseEditUser}
        />
        <ImagePickerModal
          isVisible={isVisibleImagePicker}
          onClose={onCloseImagePicker}
          setUri={setUri}
        />
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
          <IconContainer onPress={onOpenImagePicker}>
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
        {/* footer bar */}
        <View style={styles.footerBar}>
          {/* back compass description */}
          <View style={styles.bottomCompassDescription} pointerEvents="none">
            <TextInput
              ref={backCompassHeadingTextRef}
              style={styles.compassDescriptionText}
              multiline
              editable={false}
            />
          </View>
          <View style={styles.homeDirection}>
            <TextInput
              ref={homeDirectionTextRef}
              style={styles.compassStarMeaningText}
              editable={false}
            />
          </View>
          {/* <IconContainer onPress={toggleShowRect}>
            <IconSquare />
          </IconContainer> */}
          <IconContainer onPress={onOpenRotateCompass}>
            <IconRotateRight />
          </IconContainer>
          <IconContainer onPress={toggleLockCompass} width={56} height={56}>
            {isLockCompass ? <IconLock /> : <IconLockOpenRight />}
          </IconContainer>
          <IconContainer onPress={onOpenEditUser}>
            <IconEditDocument />
          </IconContainer>
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
          minimumTrackTintColor="#C81B22"
          maximumTrackTintColor="#00000080"
          thumbTintColor="#C81B22"
        />
      </View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
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
    fontSize: 20,
    fontFamily: "Roboto Condensed Bold",
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
    transform: [{ rotate: "270deg" }],
    top: screen.height / 2 - SLIDER_HEIGHT / 2,
    right: -SLIDER_WIDTH / 2 + SLIDER_HEIGHT / 2 + 9,
    zIndex: 1
  },
  slider: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
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
    fontFamily: "Roboto Condensed",
    textAlign: "center",
  },
  homeDirection: {
    position: "absolute",
    bottom: 125,
    width: screen.width,
    paddingHorizontal: 20,
  },
});
