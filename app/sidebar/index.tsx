import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useInformation } from "@/contexts/InformationContext";
import { IconStar } from "@/components/ui/icons/IconStar";
import { IconContainer } from "@/components/ui/IconContainer";
import { IconCameraCompass } from "@/components/ui/icons/IconCameraCompass";
import { IconCompass } from "@/components/ui/icons/IconCompass";
import { IconBagua } from "@/components/ui/icons/IconBagua";
import { IconFile } from "@/components/ui/icons/IconFile";
import { IconEmail } from "@/components/ui/icons/IconEmail";

export default function Sidebar(props: DrawerContentComponentProps) {
  const insets = useSafeAreaInsets();
  const { navigation } = props;
  const { showInformation } = useInformation();

  return (
    <ImageBackground
      source={require("@/assets/images/sidebar/background.png")}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>LA BÀN THẦY TUẤN</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate("MainStack", {
              screen: "Map",
            });
          }}
        >
          <IconContainer style={styles.iconContainer}>
            <IconCompass />
          </IconContainer>
          <Text style={styles.menuText}>Lập cực</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate("MainStack", {
              screen: "CompassOnly",
            });
          }}
        >
          <IconContainer style={styles.iconContainer}>
            <IconCameraCompass />
          </IconContainer>
          <Text style={styles.menuText}>Tải ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate("MainStack", {
              screen: "StarsPDF",
            });
          }}
        >
          <IconContainer style={styles.iconContainer}>
            <IconStar />
          </IconContainer>
          <Text style={styles.menuText}>24 sao</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate("MainStack", {
              screen: "SolutionPDF",
            });
          }}
        >
          <IconContainer style={styles.iconContainer}>
            <IconBagua />
          </IconContainer>
          <Text style={styles.menuText}>Hóa giải</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate("MainStack", {
              screen: "MinhTuanBookPDF",
            });
          }}
        >
          <IconContainer style={styles.iconContainer}>
            <IconFile />
          </IconContainer>
          <Text style={styles.menuText}>Tham khảo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            navigation.closeDrawer();
            showInformation();
          }}
        >
          <IconContainer style={styles.iconContainer}>
            <IconEmail />
          </IconContainer>
          <Text style={styles.menuText}>Liên hệ</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEC41F",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(123, 92, 38, 0.2)",
  },
  title: {
    fontSize: 24,
    fontFamily: "Voltaire Regular",
    color: "#7B5C26",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(123, 92, 38, 0.2)",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  menuText: {
    fontSize: 18,
    fontFamily: "Voltaire Regular",
    color: "#7B5C26",
  },
  iconContainer: {
    backgroundColor: "transparent",
  },
});
