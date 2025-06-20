import React, { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function LoadingScreen() {
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(0.4);
  const scale = useSharedValue(0.8);

  // Android-specific animation values
  const androidScale1 = useSharedValue(1);
  const androidScale2 = useSharedValue(1);
  const androidScale3 = useSharedValue(1);

  useEffect(() => {
    // iOS Animation setup
    rotation.value = 0;
    opacity.value = 0.4;
    scale.value = 0.8;

    // Rotation animation for iOS
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    // Text animations for both platforms
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.4, { duration: 1000 })
      ),
      -1,
      true
    );

    scale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.8, { duration: 800 })
      ),
      -1,
      true
    );

    // Android-specific dot animations
    if (Platform.OS === "android") {
      // First dot
      androidScale1.value = withRepeat(
        withSequence(
          withTiming(1.5, { duration: 400 }),
          withTiming(1, { duration: 400 })
        ),
        -1,
        true
      );

      // Second dot (with delay)
      androidScale2.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 200 }),
          withTiming(1.5, { duration: 400 }),
          withTiming(1, { duration: 400 })
        ),
        -1,
        true
      );

      // Third dot (with longer delay)
      androidScale3.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(1.5, { duration: 400 }),
          withTiming(1, { duration: 400 })
        ),
        -1,
        true
      );
    }

    // Cleanup animations on unmount
    return () => {
      cancelAnimation(rotation);
      cancelAnimation(opacity);
      cancelAnimation(scale);
      if (Platform.OS === "android") {
        cancelAnimation(androidScale1);
        cancelAnimation(androidScale2);
        cancelAnimation(androidScale3);
      }
    };
  }, []);

  // iOS spinner animation
  const spinnerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  // Android dot animations
  const dot1Style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: androidScale1.value }],
    };
  });

  const dot2Style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: androidScale2.value }],
    };
  });

  const dot3Style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: androidScale3.value }],
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        {Platform.OS === "ios" ? (
          // iOS spinner
          <Animated.View style={[styles.spinner, spinnerStyle]}>
            <View style={styles.spinnerInner} />
          </Animated.View>
        ) : (
          // Android dots spinner
          <View style={styles.dotsContainer}>
            <Animated.View style={[styles.dot, styles.dot1, dot1Style]} />
            <Animated.View style={[styles.dot, styles.dot2, dot2Style]} />
            <Animated.View style={[styles.dot, styles.dot3, dot3Style]} />
          </View>
        )}
        <Animated.Text style={[styles.text, textStyle]}>Loading...</Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 10,
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 20,
  },
  // iOS spinner styles
  spinner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 8,
    borderColor: "#e0e0e0",
    borderTopColor: "#3498db",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerInner: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: "#3498db",
  },
  // Android dots spinner styles
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginBottom: 20,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: "#3498db",
    margin: 5,
  },
  dot1: {
    backgroundColor: "#3498db",
  },
  dot2: {
    backgroundColor: "#2980b9",
  },
  dot3: {
    backgroundColor: "#1f618d",
  },
  // Text styles
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
  },
});
