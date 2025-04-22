import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useInformation } from "@/contexts/InformationContext";
import { IconStar } from "@/components/ui/icons/IconStar";
import { IconContainer } from "@/components/ui/IconContainer";
import { IconCameraCompass } from "@/components/ui/icons/IconCameraCompass";
import { IconCompass } from "@/components/ui/icons/IconCompass";
import { IconBagua } from "@/components/ui/icons/IconBagua";
import { IconFile } from "@/components/ui/icons/IconFile";
import { IconEmail } from "@/components/ui/icons/IconEmail";
import useNavigation, { Screen } from "@/stores/useNavigation";
import { useSidebar } from "@/contexts/SidebarContext";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { screen } from "@/constants/Dimensions";

export default function Sidebar() {
  const insets = useSafeAreaInsets();
  const { showInformation } = useInformation();
  const { navigateTo } = useNavigation();
  const translateX = useSharedValue(0);
  const { isSidebarVisible, hideSidebar } = useSidebar();

  const sidebarStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  React.useEffect(() => {
    if (isSidebarVisible) {
      translateX.value = withTiming(screen.width * 0.8, { duration: 200 });
    } else {
      translateX.value = withTiming(0, { duration: 200 });
    }
  }, [isSidebarVisible]);

  const navigate = (screen: Screen) => {
    hideSidebar();
    navigateTo(screen);
  };

  if (!isSidebarVisible) return null;
  return (
    <View style={styles.sidebarWrapper}>
      <TouchableOpacity style={styles.backdrop} onPress={hideSidebar} />
      <Animated.View style={[styles.sidebarContainer, sidebarStyle]}>
        <ImageBackground
          source={require("@/assets/images/sidebar/background.png")}
          style={[styles.container, { paddingTop: insets.top }]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>LA BÀN THẦY TUẤN</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  navigate("map");
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
                  navigate("compass-only");
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
                  navigate("stars-pdf");
                }}
              >
                <IconContainer style={styles.iconContainer}>
                  <IconStar fill={"#7B5C26"} />
                </IconContainer>
                <Text style={styles.menuText}>24 sao</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  navigate("solution-pdf");
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
                  navigate("minh-tuan-book-pdf");
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
                  navigate("mat-phap-book-pdf");
                }}
              >
                <IconContainer style={styles.iconContainer}>
                  <IconFile />
                </IconContainer>
                <Text style={styles.menuText}>Mật pháp</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  navigate("phong-thuy-nha-o-book-pdf");
                }}
              >
                <IconContainer style={styles.iconContainer}>
                  <IconFile />
                </IconContainer>
                <Text style={styles.menuText}>Nhà ở</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  navigate("huong-nha-book.pdf");
                }}
              >
                <IconContainer style={styles.iconContainer}>
                  <IconFile />
                </IconContainer>
                <Text style={styles.menuText}>Hướng nhà</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  showInformation();
                }}
              >
                <IconContainer style={styles.iconContainer}>
                  <IconEmail />
                </IconContainer>
                <Text style={styles.menuText}>Liên hệ</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebarWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    elevation: 10,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sidebarContainer: {
    height: screen.height,
    width: screen.width * 0.8,
    position: "absolute",
    left: -screen.width * 0.8,
  },
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
    fontSize: 20,
    fontFamily: "UTM Impact",
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
    fontSize: 16,
    fontFamily: "Roboto Condensed",
    color: "#7B5C26",
  },
  iconContainer: {
    backgroundColor: "transparent",
  },
});
