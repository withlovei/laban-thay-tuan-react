import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
  Text,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import CompassHeading from "react-native-compass-heading";
import Compass from "../../components/ui/Compass";
import CompassHeadingUI from "../../components/ui/CompassHeading";
import { screen } from "../../constants/Dimensions";
// import Geocoding from 'react-native-geocoding';

// Initialize Geocoding with your Google Maps API key
// Geocoding.init("YOUR_GOOGLE_MAPS_API_KEY");
const COMPASS_SIZE = screen.width - 26;
const COMPASS_HEADING_SIZE = screen.width - 10;

interface Location {
  latitude: number;
  longitude: number;
}

export default function MapScreen() {
  const [location, setLocation] = useState<Location>();
  const regionRef = useRef<Region>({
    latitude: 10.762622,
    longitude: 106.660172,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [compassHeading, setCompassHeading] = useState<number>(0);
  const mapRef = useRef<MapView>(null);
  const isReadyForUpdateHeading = useRef<boolean>(false);

  useEffect(() => {
    requestLocationPermission();
    const degree_update_rate = 0.001;

    // Start compass updates
    CompassHeading.start(
      degree_update_rate,
      ({ heading }: { heading: number }) => {
        const remapHeading = heading > 180 ? heading - 360 : heading;
        const roundedHeading = Number(remapHeading.toFixed(3));
        setCompassHeading(roundedHeading);
      }
    );
    return () => {
      CompassHeading.stop();
    };
  }, []);

  useEffect(() => {
    if (
      mapRef.current &&
      regionRef.current &&
      isReadyForUpdateHeading.current
    ) {
      mapRef.current.setCamera({
        center: {
          latitude: regionRef.current.latitude,
          longitude: regionRef.current.longitude,
        },
        pitch: 0,
        heading: compassHeading,
        zoom: 17,
      });
    }
  }, [compassHeading]);

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
        regionRef.current = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        };
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  if (!location) {
    return null;
  }
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType="satellite"
        showsCompass={false}
        showsUserLocation
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        }}
        rotateEnabled={false}
        onRegionChange={(region) => {
          regionRef.current = region;
        }}
        onRegionChangeStart={() => {
          isReadyForUpdateHeading.current = false;
        }}
        onRegionChangeComplete={() => {
          isReadyForUpdateHeading.current = true;
        }}
      />
      <View 
        style={styles.compassHeadingDesc}
        pointerEvents="none"
      >
        <Text style={{textAlign: 'center', color: "white"}}>Heading: {compassHeading}</Text>
      </View>
      <View
        style={[
          styles.compass,
          { transform: [{ rotate: `${-compassHeading}deg` }] },
        ]}
        pointerEvents="none"
      >
        <Compass />
      </View>
      <View pointerEvents="none" style={styles.compassHeading}>
        <CompassHeadingUI />
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
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
  },
  compassHeading: {
    position: "absolute",
    top: screen.height / 2 - COMPASS_HEADING_SIZE / 2,
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
});
