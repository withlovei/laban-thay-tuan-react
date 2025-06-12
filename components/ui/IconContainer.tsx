import { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface IconContainerProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const IconContainer: FC<IconContainerProps> = ({
  children,
  width = 40,
  height = 40,
  onPress,
  style,
}) => {
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper
      style={[styles.container, { width, height }, style]}
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      {children}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#C81B22",
    backgroundColor: "#db2778",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
