import React from "react";
import { StyleSheet, View } from "react-native";
import Pdf from "react-native-pdf";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationBar } from "@/components/NavigationBar";

const HuongNhaBookPDFScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationBar/>
      <View style={styles.pdfContainer}>
        <Pdf
          source={{
            uri: "https://drive.google.com/uc?export=download&id=1dQy8Os54gqbcgX6nSTkMVxL1rGB8fh25",
            cache: true,
          }}
          style={styles.pdf}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}, file path: ${filePath}`);
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
  iconBar: {
    position: "absolute",
    right: 8,
    borderRadius: 50,
    backgroundColor: "#FEC41F",
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default HuongNhaBookPDFScreen;
