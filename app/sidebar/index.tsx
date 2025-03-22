import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

export default function Sidebar(props: DrawerContentComponentProps) {
  const insets = useSafeAreaInsets();
  const { navigation } = props;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Menu</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('MainStack', {
              screen: 'Map',
            });
          }}
        >
          <Text style={styles.menuText}>Lập cực</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('MainStack', {
              screen: 'CompassOnly',
            });
          }}
        >
          <Text style={styles.menuText}>Tải ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('MainStack', {
              screen: 'StarsPDF',
            });
          }}
        >
          <Text style={styles.menuText}>24 sao</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('MainStack', {
              screen: 'SolutionPDF',
            });
          }}
        >
          <Text style={styles.menuText}>Hóa giải</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('MainStack', {
              screen: 'MinhTuanBookPDF',
            });
          }}
        >
          <Text style={styles.menuText}>Tham khảo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEC41F',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(123, 92, 38, 0.2)',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Voltaire Regular',
    color: '#7B5C26',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(123, 92, 38, 0.2)',
  },
  menuText: {
    fontSize: 18,
    fontFamily: 'Voltaire Regular',
    color: '#7B5C26',
  },
}); 