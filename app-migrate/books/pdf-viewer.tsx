import { LoadingDialog } from "@/components/ui/LoadingDialog";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Pdf from "react-native-pdf";

const BookPDFViewer = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const { url, title } = route.params as { url: string; title: string };
  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [navigation, title]);

  return (
    <View style={styles.container}>
      <View style={styles.pdfContainer}>
        <Pdf
          source={{
            uri: url,
            cache: true,
          }}
          style={styles.pdf}
          onLoadProgress={(percent) => {
            setLoadingProgress(percent);
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(
              `Number of pages: ${numberOfPages}, file path: ${filePath}`
            );
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
    </View>
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
  navTitle: {
    color: "#7B5C26",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookPDFViewer;
