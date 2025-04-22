import { useEffect } from "react";
import MapScreen from "./map";
import Sidebar from "@/app/sidebar";
import CompassOnlyScreen from "@/app/compass-only";
import StarsPDFScreen from "@/app/stars-pdf";
import { InformationProvider } from "@/contexts/InformationContext";
import { InformationBottomSheet } from "@/components/InformationBottomSheet";
import { InformationContent } from "@/components/InformationContent";
import { useInformation } from "@/contexts/InformationContext";
import { Alert, BackHandler, Linking, StyleSheet, View } from "react-native";
import { IconCall } from "@/components/ui/icons/IconCall";
import { IconPinDrop } from "@/components/ui/icons/IconPinDrop";
import { IconCaptivePortal } from "@/components/ui/icons/IconCaptivePortal";
import { PaymentProvider } from "@/contexts/PaymentContext";
import { PaymentBottomSheet } from "@/app/payment/PaymentBottomSheet";
import useNavigation from "@/stores/useNavigation";
import { SidebarProvider } from "@/contexts/SidebarContext";
import MinhTuanBookPDFScreen from "@/app/minh-tuan-book-pdf";
import SolutionPDFScreen from "@/app/solution-pdf";
import MatPhapBookPDFScreen from "./mat-phap-book-pdf";
import PhongThuyNhaOBookPDFScreen from "./phong-thuy-nha-o-book-pdf";
import HuongNhaBookPDFScreen from "./huong-nha-book-pdf";

function MainStack() {
  const { currentScreen } = useNavigation();
  switch (currentScreen) {
    case "map":
      return <MapScreen />;
    case "compass-only":
      return <CompassOnlyScreen />;
    case "stars-pdf":
      return <StarsPDFScreen />;
    case "minh-tuan-book-pdf":
      return <MinhTuanBookPDFScreen />;
    case "solution-pdf":
      return <SolutionPDFScreen />;
    case "mat-phap-book-pdf":
      return <MatPhapBookPDFScreen />;
    case "phong-thuy-nha-o-book-pdf":
      return <PhongThuyNhaOBookPDFScreen />;
    case "huong-nha-book.pdf":
      return <HuongNhaBookPDFScreen />;
    default:
      return <MapScreen />;
  }
}

function NavigationContent() {
  const { isInformationVisible, hideInformation } = useInformation();

  useEffect(() => {
    const onBackPress = () => {
      Alert.alert(
        "Thoát ứng dụng",
        "Bạn có muốn thoát ứng dụng?",
        [
          {
            text: "Hủy",
            onPress: () => {
              // Do nothing
            },
            style: "cancel",
          },
          { text: "Thoát", onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <MainStack />
      <Sidebar />
      <InformationBottomSheet
        isVisible={isInformationVisible}
        onClose={hideInformation}
        title="Thông tin liên hệ"
      >
        <InformationContent
          title="PHONG THUỶ MINH TUẤN"
          rows={[
            {
              icon: <IconCaptivePortal />,
              text: "Liên hệ website: phongthuyminhtuan.com",
              onPress: () => Linking.openURL(`https://phongthuyminhtuan.com`),
            },
            {
              icon: <IconCall />,
              text: "Hotline hỗ trợ: 088 938 2868",
              onPress: () => Linking.openURL(`tel:0889382868`),
            },
            {
              icon: <IconPinDrop fill="#7B5C26" />,
              text: "Địa chỉ: 397-399 Lê Lợi, TP Bắc Giang",
              onPress: () =>
                Linking.openURL(
                  `https://maps.google.com/?q=${encodeURIComponent(
                    "397-399 Lê Lợi, TP Bắc Giang"
                  )}`
                ),
            },
          ]}
          images={[
            {
              source: require("@/assets/images/bottomsheet/tiktok.png"),
              onPress: () =>
                Linking.openURL(`https://www.tiktok.com/@thaytuanpt`),
            },
            {
              source: require("@/assets/images/bottomsheet/facebook.png"),
              onPress: () =>
                Linking.openURL(`https://www.facebook.com/Phongthuyminhtuanbg`),
            },
            {
              source: require("@/assets/images/bottomsheet/zalo.png"),
              onPress: () =>
                Linking.openURL(`https://zalo.me/3868559906881276529`),
            },
            {
              source: require("@/assets/images/bottomsheet/youtube.png"),
              onPress: () =>
                Linking.openURL(`https://www.youtube.com/@Thaytuanphongthuy`),
            },
          ]}
          description="App La Bàn Thầy Tuấn dùng để đo tọa, hướng nhà qua vệ tinh và luận giải phong thủy nhà ở."
        />
      </InformationBottomSheet>
      <PaymentBottomSheet />
    </View>
  );
}

export default function AppNavigation() {
  return (
    <InformationProvider>
      <PaymentProvider>
        <SidebarProvider>
          <NavigationContent />
        </SidebarProvider>
      </PaymentProvider>
    </InformationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
