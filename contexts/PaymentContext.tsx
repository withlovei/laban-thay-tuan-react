import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import {
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  ProductPurchase,
  PurchaseError,
  finishTransaction,
  getProducts,
} from "react-native-iap";
import { Alert } from "react-native";
import { useUserStore } from "@/stores/useUserStore";
import { FirebaseServices } from "@/services/firebase";

interface ProductInfo {
  name: string;
  description: string;
  price: string;
  currency: string;
  localizedPrice: string;
}

interface PaymentContextType {
  isPaymentVisible: boolean;
  showPayment: () => void;
  hidePayment: () => void;
  isInitialized: boolean;
  productInfo: ProductInfo | null;
}

const PaymentContext = createContext<PaymentContextType>({
  isPaymentVisible: false,
  showPayment: () => {},
  hidePayment: () => {},
  productInfo: null,
  isInitialized: false,
});

const productIds = ["laban.full.access"];
export const usePayment = () => useContext(PaymentContext);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const updateUserRef = useRef<() => void>(() => {});
  const user = useUserStore((state) => state.user);

//   useEffect(() => {
//     const initIAP = async () => {
//       try {
//         await initConnection();
//         setIsInitialized(true);
//       } catch (err) {
//         console.warn("IAP init error:", err);
//         setIsInitialized(true);
//       }
//     };

//     const purchaseUpdateSubscription = purchaseUpdatedListener(
//       async (purchase: ProductPurchase) => {
//         const receipt = purchase.transactionReceipt;
//         if (receipt) {
//           try {
//             await finishTransaction({ purchase });
//             updateUserRef.current();
//             Alert.alert("Thành công", "Cảm ơn bạn đã mua Gói La bàn!");
//             hidePayment();
//           } catch (err) {
//             Alert.alert("Lỗi", "Không thể hoàn thành giao dịch");
//           }
//         }
//       }
//     );

//     const purchaseErrorSubscription = purchaseErrorListener(
//       (error: PurchaseError) => {
//         Alert.alert("Lỗi", error.message);
//       }
//     );

//     initIAP();

//     return () => {
//       purchaseUpdateSubscription.remove();
//       purchaseErrorSubscription.remove();
//     };
//   }, []);
  
  useEffect(() => {
    if (isInitialized) {
        getProductInfo();
    }
  }, [isInitialized]);

  useEffect(() => {
    if (user) {
        updateUserRef.current = () => FirebaseServices.updateUser({user, verifiedAt: new Date().toString()});
    }
  }, [user]);

  const getProductInfo = async () => {
    const products = await getProducts({ skus: productIds });
    setProductInfo(products[0] as any);
  }
  
  const showPayment = () => setIsPaymentVisible(true);

  const hidePayment = () => setIsPaymentVisible(false);

  return (
    <PaymentContext.Provider
      value={{
        isPaymentVisible,
        showPayment,
        hidePayment,
        isInitialized,
        productInfo,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
