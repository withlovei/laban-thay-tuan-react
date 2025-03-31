import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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
          source={{
            uri: "bundle-assets://pdf/sach_thay_tuan.pdf",
            cache: true,
          }}
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
  },
});

export default MinhTuanBookPDFScreen;
