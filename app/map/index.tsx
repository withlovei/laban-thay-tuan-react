import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
  Text,
  TextInput,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import CompassHeading from "react-native-compass-heading";
import Compass from "../../components/ui/Compass";
import CompassHeadingUI from "../../components/ui/CompassHeading";
import { screen } from "../../constants/Dimensions";
import { NavigationBar } from "../../components/NavigationBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconContainer } from "../../components/ui/IconContainer";
import { IconEyeSlash } from "../../components/ui/icons/IconEyeSlash";
import { IconDoubleArrow } from "../../components/ui/icons/IconDoubleArrow";
import { IconFlexStart } from "../../components/ui/icons/IconFlexStart";
import { IconPinDrop } from "../../components/ui/icons/IconPinDrop";
import { IconEditDocument } from "../../components/ui/icons/IconEditDocument";
import { IconLockOpenRight } from "../../components/ui/icons/IconLockOpenRight";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedReaction,
  runOnJS,
} from "react-native-reanimated";
import { useToggle } from "../../hooks/useToggle";
import { IconLock } from "../../components/ui/icons/IconLock";
import { DoaiFull } from "../../components/ui/compass/doai_full";
// import Geocoding from 'react-native-geocoding';

// Initialize Geocoding with your Google Maps API key
// Geocoding.init("YOUR_GOOGLE_MAPS_API_KEY");
const COMPASS_SIZE = screen.width - 26;
const COMPASS_HEADING_SIZE = screen.width;

interface Location {
  latitude: number;
  longitude: number;
}

export default function MapScreen() {
  const [location, setLocation] = useState<Location>();
  const { top } = useSafeAreaInsets();
  const compassHeading = useSharedValue(0);
  const mapRef = useRef<MapView>(null);
  const compassOpacity = useSharedValue(1);

  const compassStyle = useAnimatedStyle(() => ({
    opacity: compassOpacity.value,
    transform: [{ rotate: `${-compassHeading.value}deg` }],
  }));
  const updateCompassHeadingFnRef = useRef<(heading: number) => void>(() => {});
  
  const compassHeadingStyle = useAnimatedStyle(() => ({
    opacity: compassOpacity.value,
  }));
  const [isLockCompass, toggleLockCompass] = useToggle(false);

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
    goToMyLocation();
  }, [location]);

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
    const remapHeading = heading > 180 ? heading - 360 : heading;
    const roundedHeading = Number(remapHeading.toFixed(3));
    compassHeading.value = roundedHeading;
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
      />
      <View
        style={{
          backgroundColor: "transparent",
          position: "absolute",
          left: 0,
          top: 0,
          width: screen.width,
          height: screen.height,
          marginTop: top,
        }}
        pointerEvents="box-none"
      >
        <NavigationBar />
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
          <TextInput style={styles.textInput} />
          <IconContainer>
            <IconDoubleArrow />
          </IconContainer>
          <IconContainer>
            <IconFlexStart />
          </IconContainer>
        </View>
        <View style={styles.footerBar}>
          <IconContainer onPress={toggleLockCompass}>
            {isLockCompass ? <IconLock /> : <IconLockOpenRight />}
          </IconContainer>
          <IconContainer onPress={goToMyLocation}>
            <IconPinDrop />
          </IconContainer>
          <IconContainer>
            <IconEditDocument />
          </IconContainer>
        </View>
        <Animated.View
          style={[styles.compass, compassStyle]}
          pointerEvents="none"
        >
          <DoaiFull />
        </Animated.View>
        <Animated.View
          pointerEvents="none"
          style={[styles.compassHeading, compassHeadingStyle]}
        >
          <CompassHeadingUI />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  compass: {
    position: "absolute",
    left: screen.width / 2 - COMPASS_SIZE / 2,
    top: screen.height / 2 - COMPASS_SIZE / 2,
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
    borderRadius: COMPASS_SIZE / 2,
  },
  compassHeading: {
    position: "absolute",
    top:
      screen.height / 2 -
      COMPASS_HEADING_SIZE / 2 -
      7 * (COMPASS_HEADING_SIZE / 404),
    left: screen.width / 2 - COMPASS_HEADING_SIZE / 2,
    width: COMPASS_HEADING_SIZE,
    height: COMPASS_HEADING_SIZE,
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
    marginTop: 8,
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
    bottom: 32,
    width: screen.width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 8,
  },
});
