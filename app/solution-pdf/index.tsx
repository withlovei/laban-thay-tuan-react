import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import Pdf from "react-native-pdf";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationBar } from "@/components/NavigationBar";

const SolutionPDFScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationBar />
      <View style={styles.pdfContainer}>
        <Pdf
          source={Platform.select({
            android: {
              uri: "bundle-assets://pdf/cach_hoa_giai.pdf",
            },
            ios: require("@/assets/pdf/cach_hoa_giai.pdf"),
          })}
          style={styles.pdf}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          trustAllCerts={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pdfContainer: {
    flex: 1,
  },
  pdf: {
    flex: 1,
  },
});

export default SolutionPDFScreen;
