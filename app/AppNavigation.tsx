import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import UserInformationScreen from "./user-information";
import MapScreen from "./map";
import SplashScreen from "react-native-splash-screen";
import { Platform } from "react-native";
import Sidebar from "@/app/sidebar";

// Define the root stack parameter list
export type RootStackParamList = {
  UserInformation: undefined;
  Map: undefined;
  Sidebar: undefined;
};

// Create the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator initialRouteName="UserInformation">
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
          name="Sidebar"
          component={Sidebar}
          options={{
            presentation: 'transparentModal',
            animation: Platform.select({
              ios: "fade",
              android: "slide_from_left",
            }),
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
