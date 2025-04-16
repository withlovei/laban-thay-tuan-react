import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  ProductPurchase,
  PurchaseError,
  finishTransaction,
  getProducts,
  getAvailablePurchases,
} from "react-native-iap";
import { Alert, Platform } from "react-native";
import { useUserStore } from "@/stores/useUserStore";
import { FirebaseServices } from "@/services/firebase";

const DELAY_TIME_TO_CHECK_SUBSCRIPTION = 60000;
const storage = {
  isCheckSubscription: false,
};
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

  useEffect(() => {
    const initIAP = async () => {
      try {
        await initConnection();
        setIsInitialized(true);
      } catch (err) {
        console.warn("IAP init error:", err);
        setIsInitialized(true);
      }
    };

    const purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase: ProductPurchase) => {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          try {
            await finishTransaction({ purchase });
            updateUserRef.current();
            Alert.alert("Thành công", "Cảm ơn bạn đã mua Gói La bàn!");
            hidePayment();
          } catch (err) {
            Alert.alert("Lỗi", "Không thể hoàn thành giao dịch");
          }
        }
      }
    );

    const purchaseErrorSubscription = purchaseErrorListener(
      (error: PurchaseError) => {
        Alert.alert("Lỗi", error.message);
      }
    );

    if (Platform.OS === "android") {
      initIAP();
    }

    return () => {
      purchaseUpdateSubscription.remove();
      purchaseErrorSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (isInitialized) {
      getProductInfo();
      if (storage.isCheckSubscription) return;
      setTimeout(() => {
        checkSubscription();
      }, DELAY_TIME_TO_CHECK_SUBSCRIPTION);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (user) {
        updateUserRef.current = () => FirebaseServices.updateUser({user, verifiedAt: new Date().toString()});
    }
  }, [user]);

  async function checkSubscription() {
    try {
      const purchases = await getAvailablePurchases();
      storage.isCheckSubscription = true;
      if (purchases && purchases.length > 0) {
        console.log("Purchase info:", purchases);
      } else {
        showPayment();
      }
    } catch (error) {
      console.warn(error);
    }
  }
  const getProductInfo = async () => {
    const products = await getProducts({ skus: productIds });
    setProductInfo(products[0] as any);
  };

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
