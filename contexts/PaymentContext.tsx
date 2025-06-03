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
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from 'react-native-device-info';

const DELAY_TIME_TO_CHECK_SUBSCRIPTION = 60000;
const STORAGE_KEY_PROMOTION_ACTIVE = "hasActivePromotion";
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
  submitPromotionCode: (promotionCode: string, emailToUse?: string) => Promise<boolean>;
  setSubmissionError: (error: string | null) => void;
  isSubmittingCode: boolean;
  submissionError: string | null;
}

const PaymentContext = createContext<PaymentContextType>({
  isPaymentVisible: false,
  showPayment: () => {},
  hidePayment: () => {},
  productInfo: null,
  isInitialized: false,
  submitPromotionCode: async () => false,
  setSubmissionError: () => {},
  isSubmittingCode: false,
  submissionError: null,
});

const productIds = ["laban.full.access"];
export const usePayment = () => useContext(PaymentContext);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const [isSubmittingCode, setIsSubmittingCode] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const updateUserRef = useRef<() => void>(() => {});
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const initIAP = async () => {
      try {
        console.log('Initializing IAP...');
        await initConnection();
        console.log('IAP initialized successfully');
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

    // Initialize on both Android and iOS
    initIAP();

    return () => {
      purchaseUpdateSubscription.remove();
      purchaseErrorSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (isInitialized) {
      console.log('Payment system initialized, fetching product info...');
      getProductInfo();
      if (storage.isCheckSubscription) {
        console.log('Subscription already checked, skipping...');
        return;
      }
      (async () => {
        const setting = await getSetting();
        console.log('Setting:', setting);
        if(setting){
          setTimeout(() => {
            checkSubscription();
          }, DELAY_TIME_TO_CHECK_SUBSCRIPTION);
        }
      })();
    }
  }, [isInitialized]);

  useEffect(() => {
    if (user) {
      updateUserRef.current = () =>
        FirebaseServices.updateUser({
          user,
          verifiedAt: new Date().toString(),
        });
    }
  }, [user]);

  async function getSetting() {
    const setting = await fetch('https://api.labanthaytuan.vn/api/public/setting');
    const settingData = await setting.json();
    return settingData.showPayment;
  }

  async function checkSubscription() {
    try {
      const purchases = await getAvailablePurchases();
      storage.isCheckSubscription = true;

      let hasPromotion = false;
      try {
        const promoStatus = await AsyncStorage.getItem(
          STORAGE_KEY_PROMOTION_ACTIVE
        );
        if (promoStatus === "true") {
          hasPromotion = true;
        }
      } catch (e) {
        console.warn("Failed to read promotion status from AsyncStorage", e);
      }

      if (purchases && purchases.length > 0) {
        console.log("User has active IAP:", purchases);
      } else if (hasPromotion) {
        console.log("User has an active promotion code from local storage.");
      } else {
        const shouldShowPayment = await getSetting();
        if (shouldShowPayment) {
          showPayment();
        }
      }
    } catch (error) {
      console.warn("Error checking subscription/promotion:", error);
      const shouldShowPayment = await getSetting();
      if (shouldShowPayment) {
        showPayment();
      }
    }
  }

  const getProductInfo = async () => {
    console.log('Fetching product info for SKUs:', productIds);
    try {
      const products = await getProducts({ skus: productIds });
      console.log('Products fetched successfully:', products);
      if (products && products.length > 0) {
        setProductInfo(products[0] as any);
        console.log('Product info set:', products[0]);
      } else {
        console.warn('No products found, using development fallback');
        // Use fallback product info for development
        setProductInfo({
          name: "Gói La Bàn",
          description: "Truy cập tất cả các tính năng",
          price: "299000",
          currency: "VND",
          localizedPrice: "299.000 ₫"
        });
      }
    } catch (error) {
      console.warn('Error fetching products:', error);
      // Use fallback product info on error
      setProductInfo({
        name: "Gói La Bàn",
        description: "Truy cập tất cả các tính năng",
        price: "299000",
        currency: "VND",
        localizedPrice: "299.000 ₫"
      });
    }
  };

  const showPayment = () => {
    console.log('showPayment called, setting isPaymentVisible to true');
    setIsPaymentVisible(true);
  };

  const hidePayment = () => {
    console.log('hidePayment called, setting isPaymentVisible to false');
    setIsPaymentVisible(false);
  };

  const submitPromotionCode = async (promotionCode: string, emailToUse?: string): Promise<boolean> => {
    if (!promotionCode) {
      Alert.alert("Lỗi", "Vui lòng nhập mã khuyến mãi.");
      return false;
    }

    setIsSubmittingCode(true);
    setSubmissionError(null);

    const brand = DeviceInfo.getBrand();

    try {
      const response = await fetch(
        "https://api.labanthaytuan.vn/api/public/promote-code/use",
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: promotionCode,
            email: emailToUse || "",
            device: brand,
          }),
        }
      );
      if (response.ok) {
        Alert.alert("Thành công", "Mã khuyến mãi đã được áp dụng!");
        try {
          await AsyncStorage.setItem(STORAGE_KEY_PROMOTION_ACTIVE, "true");
        } catch (e) {
          console.warn("Failed to save promotion status to AsyncStorage", e);
        }
        const res = await response.json()
        hidePayment();
        setIsSubmittingCode(false);
        return true;
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.error || "Không thể áp dụng mã khuyến mãi. Vui lòng thử lại.";
        setSubmissionError(errorMessage);
        setIsSubmittingCode(false);
        return false;
      }
    } catch (error) {
      const defaultMessage = "Lỗi kết nối. Vui lòng kiểm tra mạng và thử lại.";
      const errorMessage = (error as Error).message || defaultMessage;
      setSubmissionError(errorMessage);
      setIsSubmittingCode(false);
      return false;
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        isPaymentVisible,
        showPayment,
        hidePayment,
        isInitialized,
        productInfo,
        submitPromotionCode,
        isSubmittingCode,
        submissionError,
        setSubmissionError
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
