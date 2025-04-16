import React, { forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  cancelAnimation,
} from "react-native-reanimated";
import { screen } from "@/constants/Dimensions";

export interface ImagePickerHandle {
  rotateRight: () => void;
  rotateLeft: () => void;
}

interface ImagePickerProps {
  uri?: string;
  style?: StyleProp<ViewStyle>;
}

export const ImagePicker = forwardRef<ImagePickerHandle, ImagePickerProps>(({ style, uri }, ref) => {
  // Animated values for gestures
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const isRotating = useSharedValue(false);

  useImperativeHandle(ref, () => ({
    rotateRight: () => {
      'worklet';
      if (isRotating.value) {
        cancelAnimation(rotation);
      }
      isRotating.value = true;
      rotation.value = withTiming(Math.ceil(rotation.value / 90) * 90 + 90, {
        duration: 300,
      }, (finished) => {
        if (finished) {
          isRotating.value = false;
          // Normalize the rotation value to prevent floating point errors
          rotation.value = Math.ceil(rotation.value / 90) * 90;
        }
      });
    },
    rotateLeft: () => {
      'worklet';
      if (isRotating.value) {
        cancelAnimation(rotation);
      }
      isRotating.value = true;
      rotation.value = withTiming(Math.floor(rotation.value / 90) * 90 - 90, {
        duration: 300,
      }, (finished) => {
        if (finished) {
          isRotating.value = false;
          // Normalize the rotation value to prevent floating point errors
          rotation.value = Math.floor(rotation.value / 90) * 90;
        }
      });
    },
  }));

  // Create pinch gesture
  const pinchGesture = Gesture.Pinch()
    .onBegin(() => {
      "worklet";
      savedScale.value = scale.value;
    })
    .onUpdate((event) => {
      "worklet";
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      "worklet";
      if (scale.value < 0.5) {
        scale.value = withSpring(0.5);
      } else if (scale.value > 3) {
        scale.value = withSpring(3);
      }
    });

  // Create pan gesture
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      "worklet";
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((event) => {
      "worklet";
      translateX.value = savedTranslateX.value + event.translationX;
      translateY.value = savedTranslateY.value + event.translationY;
    });

  // Combine gestures
  const gesture = Gesture.Simultaneous(pinchGesture, panGesture);

  // Animated style for the image
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={[styles.container, style]}>
      {uri && (
        <View style={[styles.imageContainer, StyleSheet.absoluteFillObject]}>
          <GestureDetector gesture={gesture}>
            <Animated.Image
              source={{ uri }}
              style={[styles.selectedImage, animatedStyle]}
              resizeMode="contain"
            />
          </GestureDetector>
        </View>
      )}
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
  },
  selectedImage: {
    width: screen.width,
    height: screen.height - 100,
  },
});
