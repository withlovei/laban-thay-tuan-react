import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import UserInformationScreen from "./user-information";
import MapScreen from "./map";
import SplashScreen from "react-native-splash-screen";
import Sidebar from "@/app/sidebar";
import EditUserModal from "@/app/edit-user-modal";
import { RootStackParamList, DrawerParamList } from "@/types/navigation";
import CompassOnlyScreen from "@/app/compass-only";
import ImagePickerModal from "@/app/image-picker-modal";
import TableOfContentsScreen from "@/app/table-of-contents-modal";
import SolutionPDFScreen from "@/app/solution-pdf";
import StarsPDFScreen from "@/app/stars-pdf";
import MinhTuanBookPDFScreen from "@/app/minh-tuan-book-pdf";
import RotateCompassModal from "@/app/rotate-compass-modal";
import { InformationProvider } from "@/contexts/InformationContext";
import { InformationBottomSheet } from "@/components/InformationBottomSheet";
import { InformationContent } from "@/components/InformationContent";
import { useInformation } from "@/contexts/InformationContext";
import { Alert, BackHandler, Linking } from "react-native";
import { IconCall } from "@/components/ui/icons/IconCall";
import { IconPinDrop } from "@/components/ui/icons/IconPinDrop";
import { IconCaptivePortal } from "@/components/ui/icons/IconCaptivePortal";

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserInformation"
        component={UserInformationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CompassOnly"
        component={CompassOnlyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditUserModal"
        component={EditUserModal}
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ImagePickerModal"
        component={ImagePickerModal}
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RotateCompassModal"
        component={RotateCompassModal}
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TableOfContents"
        component={TableOfContentsScreen}
        options={{
          presentation: "card",
          animation: "fade",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SolutionPDF"
        component={SolutionPDFScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StarsPDF"
        component={StarsPDFScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MinhTuanBookPDF"
        component={MinhTuanBookPDFScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function NavigationContent() {
  const colorScheme = useColorScheme();
  const { isInformationVisible, hideInformation } = useInformation();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    const onBackPress = () => {
      Alert.alert(
        'Thoát ứng dụng',
        'Bạn có muốn thoát ứng dụng?',
        [
          {
            text: 'Hủy',
            onPress: () => {
              // Do nothing
            },
            style: 'cancel',
          },
          { text: 'Thoát', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );
  
      return true;
    };
  
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );
  
    return () => backHandler.remove();
  }, []);

  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Drawer.Navigator
        drawerContent={(props) => <Sidebar {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#FEC41F",
            width: "80%",
          },
          overlayColor: "rgba(0, 0, 0, 0.5)",
        }}
        detachInactiveScreens={true}
      >
        <Drawer.Screen
          name="MainStack"
          component={MainStack}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
      <StatusBar style="auto" />
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
                  `https://maps.google.com/?q=${encodeURIComponent("397-399 Lê Lợi, TP Bắc Giang")}`
                ),
            },
          ]}
          images={[
            {
              source: require("@/assets/images/bottomsheet/tiktok.png"),
              onPress: () => Linking.openURL(`https://www.tiktok.com/@thaytuanpt`),
            },
            {
              source: require("@/assets/images/bottomsheet/facebook.png"),
              onPress: () => Linking.openURL(`https://www.facebook.com/Phongthuyminhtuanbg`),
            },
            {
              source: require("@/assets/images/bottomsheet/zalo.png"),
              onPress: () => Linking.openURL(`https://zalo.me/3868559906881276529`),
            },
            {
              source: require("@/assets/images/bottomsheet/youtube.png"),
              onPress: () => Linking.openURL(`https://www.youtube.com/@Thaytuanphongthuy`),
            },
          ]}
          description="Thầy Tuấn Phong Thủy - Chuyên gia tư vấn Phong Thủy và hóa giải lỗi phạm Phong Thủy nhà ở."
        />
      </InformationBottomSheet>
    </NavigationContainer>
  );
}

export default function AppNavigation() {
  return (
    <InformationProvider>
      <NavigationContent />
    </InformationProvider>
  );
}
