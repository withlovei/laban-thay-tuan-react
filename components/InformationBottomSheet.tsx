import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { IconClose } from "@/components/ui/icons/IconClose";
import { screen } from "@/constants/Dimensions";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
};

export const InformationBottomSheet: React.FC<Props> = ({
  isVisible,
  onClose,
  title = "Thông tin",
  children,
}) => {
  const translateY = useSharedValue(0);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  React.useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(-410, { damping: 50 });
    } else {
      translateY.value = withTiming(0, { duration: 200 });
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <IconClose fill="#27272A" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheetContainer: {
    height: screen.height,
    width: "100%",
    backgroundColor: "#FFF",
    position: "absolute",
    top: screen.height,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  line: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E5E5",
    borderRadius: 2,
    position: "absolute",
    top: 8,
  },
  title: {
    fontFamily: "Roboto Condensed Bold",
    fontSize: 16,
    color: "#27272A",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 8,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    fontSize: 24,
    color: "#272729",
  },
  content: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
});
