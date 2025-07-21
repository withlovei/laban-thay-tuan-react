import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { getOrCreateAppUniqueId } from "../../shared/device-id";

const GoodDayScreen = () => {
  const [url, setUrl] = useState("");
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const fetchDeviceId = async () => {
      try {
        const deviceId = await getOrCreateAppUniqueId();
        setUrl(
          `https://cms.labanthaytuan.vn/good-day?date=${today}&deviceId=${deviceId}`
        );
      } catch (error) {
        // Fallback if unable to get device ID
        console.log("error", error);
        setUrl(`https://cms.labanthaytuan.vn/good-day?date=${today}`);
      }
    };

    fetchDeviceId();
  }, []);

  const INJECTEDJAVASCRIPT = `
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'viewport');
  meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
  document.head.appendChild(meta);
`;
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {url ? (
        <WebView
          source={{ uri: url }}
          style={styles.webview}
          startInLoadingState={true}
          javaScriptEnabled={true}
          injectedJavaScript={INJECTEDJAVASCRIPT}
          domStorageEnabled={true}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webview: {
    flex: 1,
  },
});

export default GoodDayScreen;
