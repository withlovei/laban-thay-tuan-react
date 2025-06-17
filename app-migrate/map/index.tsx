import EditUserModal from "@/app-migrate/modals/edit-user";
import SearchLocationModal, {
  SearchLocation,
} from "@/app-migrate/modals/search-location";
import { PaymentBottomSheet } from "@/app-migrate/payment/PaymentBottomSheet";
import { Compass } from "@/components/Compass";
import CompassHeadingUI from "@/components/ui/CompassHeading";
import { IconContainer } from "@/components/ui/IconContainer";
import { IconEditDocument } from "@/components/ui/icons/IconEditDocument";
import { IconEyeSlash } from "@/components/ui/icons/IconEyeSlash";
import { IconFlexStart } from "@/components/ui/icons/IconFlexStart";
import { IconLock } from "@/components/ui/icons/IconLock";
import { IconLockOpenRight } from "@/components/ui/icons/IconLockOpenRight";
import { IconPinDrop } from "@/components/ui/icons/IconPinDrop";
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
import { useUserStore } from "@/stores/useUserStore";
import Slider from "@react-native-community/slider";
import {
  getCurrentPositionAsync,
  LocationAccuracy,
  requestForegroundPermissionsAsync,
} from "expo-location";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LoadingScreen from "./loading-screen";

// Color theme constants to match books section
const COMPASS_SIZE = screen.width - 26;
const COMPASS_HEADING_SIZE = screen.width - 10;
const DIMENSION_GAP = 26;
const MIN_SCALE = 0.5;
const MAX_SCALE = 2;

interface Location {
  latitude: number;
  longitude: number;
}

export default function MapScreen() {
  const user = useUserStore((state) => state.user);
  const sliderRef = useRef<Slider>(null);
  const { isVisible, onClose, onOpen } = useModal();
  const insets = useSafeAreaInsets();
  const {
    isVisible: isSearchModalVisible,
    onClose: onCloseSearchModal,
    onOpen: onOpenSearchModal,
  } = useModal();
  const [isMapReady, setIsMapReady] = useState(false);
  const [location, setLocation] = useState<Location>();
  const [searchLocation, setSearchLocation] = useState<SearchLocation | null>(
    null
  );
  const compassHeading = useSharedValue(0);
  const compassScale = useSharedValue(1);
  const mapRef = useRef<MapView>(null);
  const compassOpacity = useSharedValue(1);
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
  const compassStarMeaningTextRef = useRef<TextInput>(null);
  const homeDirectionTextRef = useRef<TextInput>(null);

  const compassHeadingStyle = useAnimatedStyle(() => ({
    opacity: compassOpacity.value,
    transform: [{ scale: compassScale.value }],
  }));
  const [isLockCompass, toggleLockCompass] = useToggle(false);
  const [isFullCompass, toggleFullCompass] = useToggle(false);
  const isInitMyLocation = useRef(false);

  useEffect(() => {
    requestLocationPermission();
    const callback = compassService.subscribe((heading: number) => {
      updateCompassHeadingFnRef.current(heading);
    });
    return () => {
      compassService.unsubscribe(callback);
    };
  }, []);

  useEffect(() => {
    if (isLockCompass) {
      updateCompassHeadingFnRef.current = () => {};
    } else {
      updateCompassHeadingFnRef.current = updateCompassHeading;
    }
  }, [isLockCompass]);

  useEffect(() => {
    if (!isLockCompass) {
      updateCompassHeadingFnRef.current = updateCompassHeading;
    }
  }, [user?.gender, user?.birthYear, isLockCompass]);

  useEffect(() => {
    if (isMapReady) {
      goToMyLocation();
    }
  }, [location, isMapReady]);

  const setSliderTintColor = useCallback((isSliding: boolean) => {
    sliderRef.current?.setNativeProps({
      minimumTrackTintColor: isSliding ? "#C81B22" : "transparent",
      maximumTrackTintColor: isSliding ? "#00000080" : "transparent",
      thumbTintColor: isSliding ? "#C81B22" : "#C81B2270",
    });
  }, []);

  const updateMapCamera = (heading: number) => {
    if (mapRef.current && location && isInitMyLocation.current) {
      mapRef.current.setCamera({
        heading: heading,
      });
    }
  };

  useAnimatedReaction(
    () => compassHeading.value,
    (heading) => {
      runOnJS(updateMapCamera)(heading);
    }
  );
  const updateCompassHeading = (heading: number) => {
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
    compassHeading.value = roundedHeading;
  };

  const handleSearchLocationTextChange = (location: SearchLocation) => {
    setSearchLocation(location);
    goToSearchLocation(location);
  };

  const goToSearchLocation = (location: SearchLocation) => {
    if (mapRef.current && location) {
      updateCompassHeadingFnRef.current = () => {};
      mapRef.current.setCamera({
        center: location,
        zoom: 19,
        pitch: 0,
      });
      updateCompassHeadingFnRef.current = updateCompassHeading;
    }
  };

  const goToMyLocation = () => {
    if (mapRef.current && location) {
      mapRef.current.setCamera({
        center: location,
        zoom: 19,
        pitch: 0,
      });
      setTimeout(() => {
        isInitMyLocation.current = true;
      }, 1000);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      getCurrentLocation();
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    getCurrentPositionAsync({
      accuracy: LocationAccuracy.High,
    }).then((location) =>
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    );
  };

  if (location === undefined) return <LoadingScreen />;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType="satellite"
        rotateEnabled={false}
        showsMyLocationButton={false}
        showsCompass={false}
        showsTraffic={false}
        showsBuildings={false}
        showsIndoorLevelPicker={false}
        showsPointsOfInterest={false}
        showsUserLocation={false}
        showsIndoors={false}
        showsScale={false}
        toolbarEnabled={false}
        onMapReady={() => setIsMapReady(true)}
        pitchEnabled={false}
        onStartShouldSetResponder={() => true}
        onResponderGrant={(e) => {
          const isTouch = e.nativeEvent.touches.length > 0;
          Platform.OS === "ios" &&
            isTouch &&
            !isLockCompass &&
            (updateCompassHeadingFnRef.current = () => {});
        }}
        onResponderRelease={(e) => {
          Platform.OS === "ios" &&
            !isLockCompass &&
            (updateCompassHeadingFnRef.current = updateCompassHeading);
        }}
        onResponderTerminationRequest={() => true}
      >
        {searchLocation && <Marker coordinate={searchLocation} />}
        <Marker
          style={{ width: 16, height: 16 }}
          coordinate={location}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <View style={styles.myLocation} />
        </Marker>
      </MapView>
      <EditUserModal isVisible={isVisible} onClose={onClose} />
      <View
        style={[styles.safeAreaView, { marginBottom: BOTTOM_BAR_HEIGHT }]}
        pointerEvents="box-none"
      >
        <SearchLocationModal
          isVisible={isSearchModalVisible}
          onClose={onCloseSearchModal}
          onConfirm={handleSearchLocationTextChange}
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
          >
            <IconEyeSlash />
          </IconContainer>
          <TouchableOpacity
            style={styles.textInput}
            onPress={onOpenSearchModal}
          >
            <TextInput
              style={styles.textInputInner}
              placeholderTextColor={"rgba(123, 92, 38, 0.2)"}
              placeholder={`Nhập địa chỉ hoặc toạ độ`}
              pointerEvents="none"
              value={searchLocation?.address}
              editable={false}
            />
          </TouchableOpacity>
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
          <IconContainer onPress={goToMyLocation}>
            <IconPinDrop />
          </IconContainer>
          <IconContainer onPress={toggleLockCompass} width={56} height={56}>
            {isLockCompass ? <IconLock /> : <IconLockOpenRight />}
          </IconContainer>
          <IconContainer onPress={onOpen}>
            <IconEditDocument />
          </IconContainer>
          {/* <IconContainer onPress={showPayment}>
            <IconInventory />
          </IconContainer> */}
        </View>
      </View>

      {/* compass */}
      <Animated.View
        style={[
          {
            position: "absolute",
            left: screen.width / 2 - COMPASS_SIZE / 2,
            top: (screen.height + DIMENSION_GAP) / 2 - COMPASS_SIZE / 2,
            width: COMPASS_SIZE,
            height: COMPASS_SIZE,
            borderRadius: COMPASS_SIZE / 2,
          },
          compassStyle,
        ]}
        pointerEvents="none"
      >
        <Compass
          gender={user?.gender ?? null}
          birthYear={user?.birthYear ?? null}
          full={isFullCompass}
          color="#fff"
          map={true}
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
              (screen.height + DIMENSION_GAP) / 2 -
              (194 / 380) * COMPASS_HEADING_SIZE,
          },
          compassHeadingStyle,
        ]}
      >
        <CompassHeadingUI />
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
          thumbTintColor="#C81B2270"
          onSlidingStart={() => {
            setSliderTintColor(true);
          }}
          onSlidingComplete={() => {
            setSliderTintColor(false);
          }}
        />
      </View>
      <PaymentBottomSheet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerContainer: {
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    fontFamily: "Roboto Condensed Bold",
  },
  toolBar: {
    marginVertical: 8,
    marginHorizontal: 16,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    height: 32,
    backgroundColor: "white",
    borderRadius: 4,
    justifyContent: "center",
  },
  textInputInner: {
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    bottom: 32,
  },
  footerControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  topCompassDescription: {
    alignItems: "center",
    justifyContent: "center",
  },
  compassDescriptionText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Roboto Condensed Bold",
    textAlign: "center",
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "transparent",
    // zIndex: 2,
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
    // zIndex: 1,
  },
  slider: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
  },
  compassStarMeaning: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
  },
  compassStarMeaningText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Roboto Condensed",
    textAlign: "center",
    fontWeight: 400,
  },
  homeDirection: {
    position: "absolute",
    bottom: 125,
    width: screen.width,
    paddingHorizontal: 20,
  },
  myLocation: {
    width: 16,
    height: 16,
    backgroundColor: "#3A83DF",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#fff",
  },
});
