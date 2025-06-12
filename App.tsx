import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootLayout from './app-migrate/AppNavigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <RootLayout />
    </SafeAreaProvider>
  );
} 