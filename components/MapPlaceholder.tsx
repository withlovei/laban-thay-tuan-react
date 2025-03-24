import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from "lottie-react-native";

export const MapPlaceholder = () => {
  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      <LottieView
        source={require("@/assets/lotties/location-loading.json")}
        style={{width: "100%", height: "100%"}}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000aa',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
  },
});
