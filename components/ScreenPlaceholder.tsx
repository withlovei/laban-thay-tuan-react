import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export const ScreenPlaceholder = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FEC41F" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000aa',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
});
