import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootLayout from "./app-migrate/AppNavigation";
import { PaymentProvider } from "./contexts/PaymentContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaymentProvider>
        <RootLayout />
      </PaymentProvider>
    </SafeAreaProvider>
  );
}
