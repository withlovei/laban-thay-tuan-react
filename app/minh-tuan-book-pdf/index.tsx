import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationBar } from '@/components/NavigationBar';
import { RootStackParamList } from '@/types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'MinhTuanBookPDF'>;
  route: RouteProp<RootStackParamList, 'MinhTuanBookPDF'>;
}
const MinhTuanBookPDFScreen = ({navigation, route}: Props) => {
  const source = require('../../assets/pdf/sach_thay_tuan.pdf') 

  useEffect(() => {
    goToTableOfContents();
  }, []);

  function goToTableOfContents() {
    navigation.navigate('TableOfContents');
  }
  return (
    <SafeAreaView style={styles.container}>
      <NavigationBar />
      <View style={styles.pdfContainer}>
        <Pdf
          source={source}
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
          page={route.params?.page}
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

export default MinhTuanBookPDFScreen; 