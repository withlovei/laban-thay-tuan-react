import { usePayment } from "@/contexts/PaymentContext";
import { useEffect } from "react";
import { getAvailablePurchases } from "react-native-iap";

const DELAY_TIME_TO_CHECK_SUBSCRIPTION = 60000;

export const useCheckSubscription = () => {
  // const { isInitialized, showPayment } = usePayment();
  // useEffect(() => {
  //   if (isInitialized) {
  //     setTimeout(() => {
  //       checkSubscription();
  //     }, DELAY_TIME_TO_CHECK_SUBSCRIPTION);
  //   }
  // }, [isInitialized]);

  // async function checkSubscription() {
  //   try {
  //     const purchases = await getAvailablePurchases();
  //     if (purchases && purchases.length > 0) {
  //       console.log('Purchase info:', purchases);
  //     } else {
  //       showPayment();
  //     }
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // }
};
