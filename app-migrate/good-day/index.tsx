import { BOTTOM_BAR_HEIGHT } from "@/constants/Dimensions";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const GoodDayScreen = () => {
  const today = new Date().toISOString().split("T")[0];
  const url = `https://cms.labanthaytuan.vn/good-day?date=${today}`;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: BOTTOM_BAR_HEIGHT,
  },
  webview: {
    flex: 1,
  },
});

export default GoodDayScreen;
