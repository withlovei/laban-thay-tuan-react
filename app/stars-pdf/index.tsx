import React from 'react';
import { StyleSheet, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationBar } from '@/components/NavigationBar';

const StarsPDFScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationBar />
      <View style={styles.pdfContainer}>
        <Pdf
          source={{uri: 'bundle-assets://pdf/y_nghia_24_sao.pdf', cache: true}}
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
    backgroundColor: '#fff',
  },
  pdfContainer: {
    flex: 1,
  },
  pdf: {
    flex: 1,
  },
});

export default StarsPDFScreen; 