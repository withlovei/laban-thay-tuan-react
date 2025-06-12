import { Background } from "@/app-migrate/compass-only/background";
import ImagePickerModal from "@/app-migrate/modals/image-picker";
import RotateCompassModal from "@/app-migrate/modals/rotate-compass";
import { Compass } from "@/components/Compass";
import { ImagePicker, ImagePickerHandle } from "@/components/ImagePicker";
import CompassHeadingUI from "@/components/ui/CompassHeading";
import { IconContainer } from "@/components/ui/IconContainer";
import { IconAdd } from "@/components/ui/icons/IconAdd";
import { IconEditDocument } from "@/components/ui/icons/IconEditDocument";
import { IconEyeSlash } from "@/components/ui/icons/IconEyeSlash";
import { IconFlexStart } from "@/components/ui/icons/IconFlexStart";
import { IconLock } from "@/components/ui/icons/IconLock";
import { IconLockOpenRight } from "@/components/ui/icons/IconLockOpenRight";
import { IconRotateRight } from "@/components/ui/icons/IconRotateRight";
import { COLORS } from "@/constants/Colors";
import {
  BOTTOM_BAR_HEIGHT,
  screen,
  SLIDER_HEIGHT,
  SLIDER_WIDTH,
} from "@/constants/Dimensions";
import { useModal } from "@/hooks/useModal";
import { useToggle } from "@/hooks/useToggle";
import { compassService } from "@/services/compass";
import {
  getDescriptionByHeading,
  getDirectionByCompassHeading,
  getSpecialDirectionByCompassHeading,
  getStar,
  getStarMeaning,
  normalizeHeading,
} from "@/shared/compass";
import { mapGenderToText } from "@/shared/transform";
import { isNumberFinite } from "@/shared/validation";
import { useUserStore } from "@/stores/useUserStore";
import Slider from "@react-native-community/slider";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconRightArrow } from "../../components/ui/icons/IconRightArrow";
import EditUserV2Modal from "../modals/edit-user-v2";

const COMPASS_SIZE = screen.width - 26;
const COMPASS_HEADING_SIZE = screen.width - 10;
const MIN_SCALE = 0.5;
const MAX_SCALE = 2;

export default function CompassOnlyScreen() {
  const user = useUserStore((state) => state.user);
  const insets = useSafeAreaInsets();
  const imagePickerRef = useRef<ImagePickerHandle>(null);
  const [isShowRect, toggleShowRect] = useToggle(true);
  const compassStarMeaningTextRef = useRef<TextInput>(null);
  const homeDirectionTextRef = useRef<TextInput>(null);
  const compassHeading = useSharedValue(0);
  const compassScale = useSharedValue(1);
  const compassOpacity = useSharedValue(1);
  const [uri, setUri] = useState<string | null>(null);
  const sliderRef = useRef<Slider>(null);
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
  }));
  const [isLockCompass, toggleLockCompass, setIsLockCompass] = useToggle(false);
  const [isFullCompass, toggleFullCompass] = useToggle(false);

  const setSliderTintColor = useCallback((isSliding: boolean) => {
    sliderRef.current?.setNativeProps({
      minimumTrackTintColor: isSliding
        ? COLORS.sliderThumbActive
        : "transparent",
      maximumTrackTintColor: isSliding ? COLORS.sliderTrack : "transparent",
      thumbTintColor: isSliding ? COLORS.sliderThumbActive : COLORS.sliderThumb,
    });
  }, []);

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
    if (!isLockCompass) {
      updateCompassHeadingFnRef.current = updateCompassHeading;
    }
  }, [user?.gender, user?.birthYear, isLockCompass]);

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
      text: `Hướng ${specialDirection} ${heading.toFixed(1)}° ${direction}`,
    });

    const backHeading = normalizeHeading(heading + 180);
    const backDirection = getDirectionByCompassHeading(backHeading);
    const backSpecialDirection =
      getSpecialDirectionByCompassHeading(backHeading);
    const genderText = mapGenderToText(user?.gender);
    const userInfo = user ? `${genderText} - ${user?.birthYear}` : "";
    backCompassHeadingTextRef.current?.setNativeProps({
      text: `${userInfo}\nHướng ${backSpecialDirection} ${backHeading.toFixed(
        1
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
    const description = getDescriptionByHeading(forwardHeading);
    homeDirectionTextRef.current?.setNativeProps({
      text: description,
    });

    const remapHeading = heading > 180 ? heading - 360 : heading;
    const roundedHeading = Number(remapHeading.toFixed(1));
    compassHeading.value = animation
      ? withTiming(roundedHeading, { duration: 500 })
      : roundedHeading;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Background />
      {uri && (
        <ImagePicker
          ref={imagePickerRef}
          style={StyleSheet.absoluteFillObject}
          uri={uri}
        />
      )}
      <View style={[styles.safeAreaView]} pointerEvents="box-none">
        <RotateCompassModal
          isVisible={isVisibleRotateCompass}
          onClose={onCloseRotateCompass}
          onConfirm={(degree) => setRotate({ degree, isDone: false })}
        />
        <EditUserV2Modal
          isVisible={isVisibleEditUser}
          onClose={onCloseEditUser}
        />
        <ImagePickerModal
          isVisible={isVisibleImagePicker}
          onClose={onCloseImagePicker}
          setUri={setUri}
        />
        {/* tool bar */}
        <View style={styles.toolBar}>
          <IconContainer
            onPress={() => {
              compassOpacity.value = withTiming(
                compassOpacity.value === 0 ? 1 : 0,
                { duration: 200 }
              );
            }}
            style={styles.iconButton}
          >
            <IconEyeSlash fill={COLORS.secondary} />
          </IconContainer>
          <IconContainer onPress={onOpenImagePicker} style={styles.iconButton}>
            <IconAdd fill={COLORS.secondary} />
          </IconContainer>
          <IconContainer onPress={toggleFullCompass} style={styles.iconButton}>
            <IconFlexStart fill={COLORS.secondary} />
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
          <IconContainer
            onPress={onOpenRotateCompass}
            style={styles.iconButton}
          >
            <IconRotateRight fill={COLORS.secondary} />
          </IconContainer>
          <IconContainer
            onPress={() => imagePickerRef.current?.rotateLeft()}
            style={[styles.rotateIcon, styles.iconButton]}
          >
            <IconRightArrow opacity={1} stroke={COLORS.secondary} />
          </IconContainer>
          <IconContainer
            onPress={toggleLockCompass}
            width={56}
            height={56}
            style={styles.lockButton}
          >
            {isLockCompass ? (
              <IconLock fill={COLORS.secondary} />
            ) : (
              <IconLockOpenRight fill={COLORS.secondary} />
            )}
          </IconContainer>
          <IconContainer
            onPress={() => imagePickerRef.current?.rotateRight()}
            style={styles.iconButton}
          >
            <IconRightArrow opacity={1} stroke={COLORS.secondary} />
          </IconContainer>
          <IconContainer onPress={onOpenEditUser} style={styles.iconButton}>
            <IconEditDocument fill={COLORS.secondary} />
          </IconContainer>
        </View>
      </View>
      {/* compass */}
      <Animated.View
        style={[
          {
            position: "absolute",
            left: screen.width / 2 - COMPASS_SIZE / 2,
            top:
              (screen.height - BOTTOM_BAR_HEIGHT - insets.bottom - insets.top) /
                2 -
              COMPASS_SIZE / 2,
            width: COMPASS_SIZE,
            height: COMPASS_SIZE,
            borderRadius: COMPASS_SIZE / 2,
            zIndex: 1,
          },
          compassStyle,
        ]}
        pointerEvents="none"
      >
        <Compass
          gender={user?.gender ?? null}
          birthYear={user?.birthYear ?? null}
          full={isFullCompass}
        />
      </Animated.View>
      {/* compass heading */}
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: "absolute",
            left: screen.width / 2 - COMPASS_HEADING_SIZE / 2,
            width: COMPASS_HEADING_SIZE,
            height: COMPASS_HEADING_SIZE * (388 / 380),
            top:
              (screen.height - BOTTOM_BAR_HEIGHT - insets.bottom - insets.top) /
                2 -
              (194 / 380) * COMPASS_HEADING_SIZE,
            zIndex: 1,
          },
          compassHeadingStyle,
        ]}
      >
        <CompassHeadingUI showRect={isShowRect} />
      </Animated.View>
      {/* compass scale slider */}
      <View style={styles.sliderContainer}>
        <Slider
          ref={sliderRef as any}
          style={styles.slider}
          minimumValue={MIN_SCALE}
          maximumValue={MAX_SCALE}
          value={1}
          onValueChange={(value: number) => {
            compassScale.value = value;
          }}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor={COLORS.sliderThumb}
          onSlidingStart={() => {
            setSliderTintColor(true);
          }}
          onSlidingComplete={() => {
            setSliderTintColor(false);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FEC41F",
    backgroundColor: "#fff",
    marginBottom: BOTTOM_BAR_HEIGHT,
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
  iconButton: {
    backgroundColor: COLORS.controlBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  lockButton: {
    backgroundColor: COLORS.controlBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    height: 32,
    backgroundColor: COLORS.background,
    borderRadius: 4,
    padding: 8,
    color: COLORS.primary,
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
    // backgroundColor: COLORS.overlayBackground,
  },
  compassDescriptionText: {
    color: COLORS.textLight,
    fontSize: 20,
    fontFamily: "Roboto Condensed Bold",
    textAlign: "center",
    // textShadowColor: "rgba(0, 0, 0, 0.75)",
    // textShadowOffset: { width: 1, height: 1 },
    // textShadowRadius: 2,
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
    // backgroundColor: COLORS.overlayBackground,
    // paddingHorizontal: 12,
    // paddingVertical: 4,
    // borderRadius: 16,
  },
  sliderContainer: {
    position: "absolute",
    transform: [{ rotate: "270deg" }],
    top: screen.height / 2 - SLIDER_HEIGHT / 2,
    right: -SLIDER_WIDTH / 2 + SLIDER_HEIGHT / 2 + 9,
    zIndex: 1,
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
    // backgroundColor: COLORS.overlayBackground,
    // paddingHorizontal: 12,
    // paddingVertical: 4,
    // borderRadius: 16,
    // marginTop: 8,
  },
  compassStarMeaningText: {
    color: COLORS.textLight,
    fontSize: 18,
    fontFamily: "Roboto Condensed",
    textAlign: "center",
    // textShadowColor: "rgba(0, 0, 0, 0.75)",
    // textShadowOffset: { width: 1, height: 1 },
    // textShadowRadius: 2,
  },
  homeDirection: {
    position: "absolute",
    bottom: 125,
    width: screen.width,
    paddingHorizontal: 20,
    // backgroundColor: COLORS.overlayBackground,
    // paddingVertical: 4,
    // borderRadius: 16,
  },
  rotateIcon: {
    transform: [{ rotate: "180deg" }],
  },
});
