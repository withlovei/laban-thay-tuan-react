import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
  TextInput,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import CompassHeading from "react-native-compass-heading";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToggle } from "@/hooks/useToggle";
import { IconLock } from "@/components/ui/icons/IconLock";
import { screen } from "@/constants/Dimensions";
import { NavigationBar } from "@/components/NavigationBar";
import { IconContainer } from "@/components/ui/IconContainer";
import { IconEyeSlash } from "@/components/ui/icons/IconEyeSlash";
import { IconDoubleArrow } from "@/components/ui/icons/IconDoubleArrow";
import { IconFlexStart } from "@/components/ui/icons/IconFlexStart";
import { IconPinDrop } from "@/components/ui/icons/IconPinDrop";
import { IconEditDocument } from "@/components/ui/icons/IconEditDocument";
import { IconLockOpenRight } from "@/components/ui/icons/IconLockOpenRight";
import CompassHeadingUI from "@/components/ui/CompassHeading";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedReaction,
  runOnJS,
} from "react-native-reanimated";
import Slider from "@react-native-community/slider";
import { useUserStore } from "@/stores/useUserStore";
import { Compass } from "@/components/Compass";
import { isNumberFinite, isNumberInRange } from "@/shared/validation";
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
import { ScreenPlaceholder } from "@/components/ScreenPlaceholder";

type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, "Map">;

interface MapScreenProps {
  navigation: MapScreenNavigationProp;
}

const COMPASS_SIZE = screen.width - 26;
const COMPASS_HEADING_SIZE = screen.width;
const MIN_SCALE = 0.5;
const MAX_SCALE = 2;

interface Location {
  latitude: number;
  longitude: number;
}

export default function MapScreen({ navigation }: MapScreenProps) {
  const user = useUserStore((state) => state.user);
  const [isMapReady, setIsMapReady] = useState(false);
  const [location, setLocation] = useState<Location>();
  const [searchLocation, setSearchLocation] = useState<Location>();
  const compassHeading = useSharedValue(0);
  const compassScale = useSharedValue(1);
  const mapRef = useRef<MapView>(null);
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
  const compassStarMeaningTextRef = useRef<TextInput>(null);
  const homeDirectionTextRef = useRef<TextInput>(null);

  const compassHeadingStyle = useAnimatedStyle(() => ({
    opacity: compassOpacity.value,
    transform: [{ scale: compassScale.value }],
    top:
      screen.height / 2 -
      COMPASS_HEADING_SIZE / 2 -
      7 * compassScale.value * (COMPASS_HEADING_SIZE / 404),
  }));
  const [isLockCompass, toggleLockCompass] = useToggle(false);
  const [isFullCompass, toggleFullCompass] = useToggle(false);

  useEffect(() => {
    requestLocationPermission();
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
    if (isLockCompass) {
      updateCompassHeadingFnRef.current = () => {};
    } else {
      updateCompassHeadingFnRef.current = updateCompassHeading;
    }
  }, [isLockCompass]);

  useEffect(() => {
    updateCompassHeadingFnRef.current = updateCompassHeading;
  }, [user?.gender, user?.birthYear]);

  useEffect(() => {
    if (isMapReady) {
      goToMyLocation();
    }
  }, [location, isMapReady]);

  const updateMapCamera = (heading: number) => {
    if (mapRef.current && location) {
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
    compassHeading.value = roundedHeading;
  };

  const handleSearchLocationTextChange = (text: string) => {
    const [latitude, longitude] = text.split(",");
    if (
      latitude &&
      longitude &&
      isNumberFinite(latitude) &&
      isNumberFinite(longitude)
    ) {
      setSearchLocation({
        latitude: Number(latitude),
        longitude: Number(longitude),
      });
    }
  };

  const goToSearchLocation = () => {
    if (mapRef.current && searchLocation) {
      mapRef.current.setCamera({
        center: searchLocation,
        zoom: 17,
        pitch: 0,
      });
    }
    if (!searchLocation) {
      alert("Vui lòng nhập đúng tọa độ");
    }
  };

  const goToMyLocation = () => {
    if (mapRef.current && location) {
      mapRef.current.setCamera({
        center: location,
        zoom: 17,
        pitch: 0,
      });
    }
  };

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === "ios") {
        const auth = await Geolocation.requestAuthorization("whenInUse");
        if (auth === "granted") {
          getCurrentLocation();
        }
      }

      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "App needs access to your location",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  if (user === null || location === undefined) return <ScreenPlaceholder />;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType="satellite"
        showsCompass={false}
        showsUserLocation
        rotateEnabled={false}
        showsMyLocationButton={false}
        onMapReady={() => setIsMapReady(true)}
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
          <TextInput
            style={styles.textInput}
            placeholderTextColor={"rgba(123, 92, 38, 0.2)"}
            placeholder={`${location?.latitude}, ${location?.longitude}`}
            onChangeText={(text) => handleSearchLocationTextChange(text)}
          />
          <IconContainer onPress={goToSearchLocation}>
            <IconDoubleArrow />
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
          <IconContainer onPress={toggleLockCompass}>
            {isLockCompass ? <IconLock /> : <IconLockOpenRight />}
          </IconContainer>
          <IconContainer onPress={goToMyLocation}>
            <IconPinDrop />
          </IconContainer>
          <IconContainer onPress={() => navigation.navigate("EditUserModal")}>
            <IconEditDocument />
          </IconContainer>
        </View>
        <View style={styles.homeDirection}>
          <TextInput
            ref={homeDirectionTextRef}
            style={styles.compassStarMeaningText}
            editable={false}
          />
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
            minimumTrackTintColor="#FEC41F"
            maximumTrackTintColor="#FFFFFF"
            thumbTintColor="#FEC41F"
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
          color="#fff"
        />
      </Animated.View>
      {/* compass heading */}
      <Animated.View
        pointerEvents="none"
        style={[styles.compassHeading, compassHeadingStyle]}
      >
        <CompassHeadingUI />
      </Animated.View>
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
    color: "white",
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
    bottom: 140,
    width: screen.width,
    paddingHorizontal: 20,
  },
  slider: {
    width: "100%",
    height: 40,
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
    fontFamily: "Voltaire Regular",
    textAlign: "center",
  },
  homeDirection: {
    position: "absolute",
    bottom: 125,
    width: screen.width,
    paddingHorizontal: 20,
  },
});
