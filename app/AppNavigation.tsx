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

export default function AppNavigation() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hide();
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
        detachInactiveScreens={false}
      >
        <Drawer.Screen
          name="MainStack"
          component={MainStack}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
