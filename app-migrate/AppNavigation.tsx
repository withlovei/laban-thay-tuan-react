import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { CurvedBottomBar } from "react-native-curved-bottom-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import BooksNavigator from "./books";
import CompassOnlyScreen from "./compass-only";
import ContactScreen from "./contact";
import GoodDayScreen from "./good-day";
import MapScreen from "./map";

export default function App() {
  const insets = useSafeAreaInsets();
  const _renderIcon = (routeName: string, selectedTab: string) => {
    let icon = "";
    switch (routeName) {
      case "good-day":
        icon = "calendar-outline";
        break;
      case "compass-only":
        icon = "image-outline";
        break;
      case "books":
        icon = "book-outline";
        break;
      case "contact":
        icon = "information-circle-outline";
        break;
    }

    return (
      <Ionicons
        name={icon as any}
        size={25}
        color={routeName === selectedTab ? "black" : "gray"}
      />
    );
  };
  const renderTabBar = ({
    routeName,
    selectedTab,
    navigate,
  }: {
    routeName: string;
    selectedTab: string;
    navigate: (routeName: string) => void;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <NavigationContainer>
        <CurvedBottomBar.Navigator
          type="UP"
          style={styles.bottomBar}
          shadowStyle={styles.shawdow}
          height={55}
          circleWidth={50}
          bgColor="white"
          initialRouteName="good-day"
          borderTopLeftRight
          renderCircle={({ selectedTab, navigate }) => (
            <Animated.View
              style={[
                styles.btnCircleUp,
                {
                  backgroundColor: selectedTab === "map" ? "#FFF8E7" : "white",
                },
              ]}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigate("map")}
              >
                <Ionicons
                  name={"map-outline"}
                  color={selectedTab === "map" ? "#7B5C26" : "gray"}
                  size={25}
                />
              </TouchableOpacity>
            </Animated.View>
          )}
          tabBar={renderTabBar}
        >
          <CurvedBottomBar.Screen
            name="good-day"
            position="LEFT"
            component={() => <GoodDayScreen />}
            options={{
              headerShown: false,
            }}
          />
          <CurvedBottomBar.Screen
            name="compass-only"
            position="LEFT"
            component={() => <CompassOnlyScreen />}
            options={{
              headerShown: false,
            }}
          />
          <CurvedBottomBar.Screen
            name="books"
            component={() => <BooksNavigator />}
            position="RIGHT"
            options={{
              headerShown: false,
            }}
          />
          <CurvedBottomBar.Screen
            name="contact"
            component={() => <ContactScreen />}
            position="RIGHT"
            options={{
              headerShown: true,
              headerTitle: "Thông tin liên hệ",
              headerTitleStyle: {
                fontFamily: "Roboto Condensed",
                fontSize: 16,
                color: "#7B5C26",
              },
            }}
          />
          <CurvedBottomBar.Screen
            name="map"
            component={() => <MapScreen />}
            position="CENTER"
            options={{
              headerShown: false,
            }}
          />
        </CurvedBottomBar.Navigator>
      </NavigationContainer>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shawdow: {
    shadowColor: "#DDDDDD",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: "center",
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E8E8",
    bottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: "gray",
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: "#BFEFFF",
  },
  screen2: {
    flex: 1,
    backgroundColor: "#FFEBCD",
  },
});
