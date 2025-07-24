import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootLayout from "./app-migrate/AppNavigation";
import { PaymentProvider } from "./contexts/PaymentContext";
import { compassService } from "./services/compass";
import ErrorBoundary from "./components/ErrorBoundary";
import * as Sentry from '@sentry/react-native';
import { initSentry } from "./services/sentry";

initSentry();

export default Sentry.wrap(function App() {
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
    <ErrorBoundary>
      <SafeAreaProvider>
        <PaymentProvider>
          <RootLayout />
        </PaymentProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
});