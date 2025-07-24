import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppState, AppStateStatus } from "react-native";
import RootLayout from "./app-migrate/AppNavigation";
import { PaymentProvider } from "./contexts/PaymentContext";
import { compassService } from "./services/compass";

export default function App() {
  useEffect(() => {
    return () => {
      console.log("App unmounted");
      try {
        compassService.destroy();
      } catch (error) {
        console.warn("Error destroying compass service:", error);
      }
    };
  }, []);

  return (
    <SafeAreaProvider>
      <PaymentProvider>
        <RootLayout />
      </PaymentProvider>
    </SafeAreaProvider>
  );
}
