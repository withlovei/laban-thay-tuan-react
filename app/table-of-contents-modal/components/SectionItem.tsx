import { IconContainer } from "@/components/ui/IconContainer";
import { IconRightArrow } from "@/components/ui/icons/IconRightArrow";
import { screen } from "@/constants/Dimensions";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SectionItemProps {
  title: string;
  Icon: React.ReactNode;
  onPress: () => void;
}

export const SectionItem: FC<SectionItemProps> = ({ title, Icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <IconContainer width={24} height={24}>
        {Icon}
      </IconContainer>
      <Text style={styles.title}>{title}</Text>
      <IconContainer width={24} height={24} style={styles.arrow}>
        <IconRightArrow />
      </IconContainer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingLeft: 6,
    paddingVertical: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: "Roboto Condensed",
    color: "#fff",
    marginLeft: 16,
    maxWidth: screen.width - 129,
  },
  arrow: {
    marginLeft: "auto",
  },
});
