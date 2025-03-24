import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  View,
  StyleSheet,
  Image,
  ViewStyle,
  StyleProp,
} from "react-native";
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { screen } from "@/constants/Dimensions";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/types/navigation";

interface ImagePickerProps {
  from: keyof RootStackParamList;
  uri?: string;
  style?: StyleProp<ViewStyle>;
}

export interface ImagePickerRef {
  showModal: () => void;
  hideModal: () => void;
}

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const ImagePicker = forwardRef<ImagePickerRef, ImagePickerProps>(
  ({ from, style, uri }, ref) => {
    const navigation = useNavigation<NavigationProp>();

    // Animated values for gestures
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const savedTranslateX = useSharedValue(0);
    const savedTranslateY = useSharedValue(0);

    useImperativeHandle(ref, () => ({
      showModal: () => {
        navigation.navigate("ImagePickerModal", {
          from,
        });
      },
      hideModal: () => {
        // No need to implement this as the modal is handled by navigation
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
  }
);

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
