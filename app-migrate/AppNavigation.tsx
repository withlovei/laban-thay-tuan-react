import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import BooksNavigator from "./books";
import CompassOnlyScreen from "./compass-only";
import ContactScreen from "./contact";
import GoodDayScreen from "./good-day";
import MapScreen from "./map";
import LinearGradient from "react-native-linear-gradient";
import { BOTTOM_BAR_HEIGHT } from "../constants/Dimensions";

const Tab = createBottomTabNavigator();

export default function App() {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="good-day"
          screenOptions={({ route }) => ({
            headerShown: route.name === "contact",
            headerTitle:
              route.name === "contact" ? "Thông tin liên hệ" : undefined,
            headerTitleStyle:
              route.name === "contact"
                ? {
                    fontFamily: "Roboto Condensed",
                    fontSize: 16,
                    color: "#7B5C26",
                  }
                : undefined,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = "";
              switch (route.name) {
                case "good-day":
                  iconName = "calendar-outline";
                  break;
                case "compass-only":
                  iconName = "burst-mode";
                  break;
                case "books":
                  iconName = "book-outline";
                  break;
                case "contact":
                  iconName = "information-circle-outline";
                  break;
                case "map":
                  iconName = "map-search-outline";
                  break;
              }
              if (route.name === "compass-only") {
                return (
                  <MaterialIcons
                    name={iconName as any}
                    size={size}
                    color={color}
                  />
                );
              }
              return (
                <Ionicons name={iconName as any} size={size} color={color} />
              );
            },
            tabBarActiveTintColor: "red",
            tabBarInactiveTintColor: "#1C1B1F",
            tabBarStyle: {
              backgroundColor: "#FEC41F",
              height: BOTTOM_BAR_HEIGHT + insets.bottom,
            },
            tabBarLabelStyle: {
              fontFamily: "Roboto Condensed",
              fontSize: 10,
            },
            tabBarButton: ({ children, accessibilityState, to, ...props }) => {
              const isMapButton = to === "/map";
              const isFocused = accessibilityState?.selected;
              return (
                <Pressable
                  {...props}
                  style={[props.style, { justifyContent: "flex-start" }]}
                >
                  <View
                    style={{
                      width: "70%",
                      height: 4,
                      backgroundColor: isFocused ? "red" : "transparent",
                      borderBottomLeftRadius: 16,
                      borderBottomRightRadius: 16,
                    }}
                  />
                  {isMapButton ? (
                    <LinearGradient
                      colors={["#FEC41F", "#ED1C24"]}
                      start={{ x: 0, y: 0.75 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.gradientBorder}
                    >
                      <View style={styles.innerCircle}>
                        <MaterialCommunityIcons
                          name="map-search-outline"
                          size={32}
                          color={isFocused ? "red" : "black"}
                        />
                      </View>
                    </LinearGradient>
                  ) : (
                    children
                  )}
                </Pressable>
              );
            },
          })}
        >
          <Tab.Screen
            name="good-day"
            component={GoodDayScreen}
            options={{ title: "Trang chủ" }}
          />
          <Tab.Screen
            name="compass-only"
            component={CompassOnlyScreen}
            options={{ title: "Cá nhân hoá" }}
          />
          <Tab.Screen
            name="map"
            component={MapScreen}
            options={{ title: "Bản đồ" }}
          />
          <Tab.Screen
            name="books"
            component={BooksNavigator}
            options={{ title: "Thư viện sách" }}
          />
          <Tab.Screen
            name="contact"
            component={ContactScreen}
            options={{
              title: "Thông tin",
              headerShown: true,
              headerTitle: "Thông tin liên hệ",
              headerTitleStyle: {
                fontFamily: "Roboto Condensed",
                fontSize: 16,
                color: "#7B5C26",
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEC41F",
  },
  gradientBorder: {
    borderRadius: 30, // Should be half of width/height for a circle
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
  },
  innerCircle: {
    backgroundColor: "#FEC41F", // Or your background color
    borderRadius: 29, // Slightly less than outer for border effect
    width: 58, // Adjust as needed
    height: 58, // Adjust as needed
    alignItems: "center",
    justifyContent: "center",
  },
});
