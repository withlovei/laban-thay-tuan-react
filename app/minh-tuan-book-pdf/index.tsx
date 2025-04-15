import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import Pdf from "react-native-pdf";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationBar } from "@/components/NavigationBar";
import { useModal } from "@/hooks/useModal";
import TableOfContentsModal from "@/app/table-of-contents-modal";
import { IconAZ } from "@/components/ui/icons/IconAZ";

const MinhTuanBookPDFScreen = () => {
  const [page, setPage] = useState(0);
  const { isVisible, onClose, onOpen } = useModal();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TableOfContentsModal
        isVisible={isVisible}
        onClose={onClose}
        setPageIndex={setPage}
      />
      <NavigationBar>
        <TouchableOpacity style={styles.iconBar} onPress={onOpen}>
          <IconAZ />
        </TouchableOpacity>
      </NavigationBar>
      <View style={styles.pdfContainer}>
        <Pdf
          source={Platform.select({
            android: {
              uri: "bundle-assets://pdf/sach_thay_tuan.pdf",
            },
            ios: require("@/assets/pdf/sach_thay_tuan.pdf"),
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
          // enablePaging
          trustAllCerts={false}
          page={page}
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

export default MinhTuanBookPDFScreen;
