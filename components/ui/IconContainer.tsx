import { View } from "react-native";
import { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface IconContainerProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  onPress?: () => void;
}

export const IconContainer: FC<IconContainerProps> = ({
  children,
  width = 32,
  height = 32,
  onPress,
}) => {
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper
      style={[styles.container, { width, height }]}
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      {children}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C81B22",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
