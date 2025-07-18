import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Pdf from "react-native-pdf";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationBar } from "@/components/NavigationBar";
import { LoadingDialog } from "@/components/ui/LoadingDialog";

const HuongNhaBookPDFScreen = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
          onLoadProgress={(percent) => {
            setLoadingProgress(percent);
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}, file path: ${filePath}`);
            setIsLoading(false);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
            setIsLoading(false);
          }}
          trustAllCerts={false}
        />
      </View>

      <LoadingDialog
        visible={isLoading}
        progress={loadingProgress}
        message="Đang tải sách, vui lòng chờ..."
      />
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
  }
});

export default HuongNhaBookPDFScreen;
