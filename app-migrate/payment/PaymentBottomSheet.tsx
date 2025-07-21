import { IconCheckMark } from "@/components/ui/icons/IconCheckMark";
import { usePayment } from "@/contexts/PaymentContext";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { requestPurchase } from "react-native-iap";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BOTTOM_BAR_HEIGHT } from "../../constants/Dimensions";
import PromoCodeInputSheet from "./PromoCodeInputSheet";

const productIds =
  Platform.select({
    ios: ["vn.labanthaytuan.book"],
    android: ["laban.full.access"],
  }) || [];

export const PaymentBottomSheet = () => {
  const [loading, setLoading] = useState(false);
  const { bottom } = useSafeAreaInsets();
  const {
    isInitialized,
    productInfo,
    isPaymentVisible: isVisible,
    hidePayment,
    setSubmissionError,
  } = usePayment();

  const [isPromoInputVisible, setIsPromoInputVisible] = useState(false);

  console.log("PaymentBottomSheet render:", {
    isVisible,
    isInitialized,
    hasProductInfo: !!productInfo,
  });

  const handlePurchase = async () => {
    if (!isInitialized) {
      Alert.alert(
        "Lỗi",
        "Đang khởi tạo hệ thống thanh toán. Vui lòng thử lại sau."
      );
      return;
    }

    try {
      setLoading(true);
      if (productIds) {
        await requestPurchase({ skus: productIds, sku: productIds[0] });
      }
    } catch (err) {
      console.warn(err);
      Alert.alert(
        "Lỗi",
        "Không thể thực hiện thanh toán. Vui lòng thử lại sau."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleZaloContact = () => {
    Linking.openURL("https://zalo.me/3868559906881276529");
  };

  const handleYoutubeGuide = () => {
    Linking.openURL("https://www.youtube.com/@Thaytuanphongthuy");
  };

  if (!isVisible || !productInfo) return null;

  const openPromoInput = () => {
    setIsPromoInputVisible(true);
  };

  const closePromoInput = () => {
    setSubmissionError(null);
    setIsPromoInputVisible(false);
  };

  return (
    <View style={styles.modal}>
      <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} />
      <View
        style={[
          styles.bottomSheetContainer,
          { paddingBottom: bottom + BOTTOM_BAR_HEIGHT },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{productInfo?.name}</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.priceSection}>
            <Text style={styles.price}>{productInfo?.localizedPrice}</Text>
            <Text style={styles.description}>{productInfo?.description}</Text>
            <Text style={styles.includes}>Bao gồm:</Text>
            <View>
              <View style={styles.benefitContainer}>
                <IconCheckMark />
                <Text style={styles.benefit}>3 Ebook hướng dẫn</Text>
              </View>
              <View style={styles.benefitContainer}>
                <IconCheckMark />
                <Text style={styles.benefit}>Truy cập không giới hạn</Text>
              </View>
              <View style={styles.benefitContainer}>
                <IconCheckMark />
                <Text style={styles.benefit}>Cập nhật miễn phí</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.purchaseButton]}
              onPress={handlePurchase}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Đang xử lý..." : "Mua ngay"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.promoCodeEntryButton]}
              onPress={openPromoInput}
            >
              <Text style={styles.buttonText}>Nhập mã khuyến mãi</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.zaloButton]}
              onPress={handleZaloContact}
            >
              <Text style={styles.buttonText}>Liên hệ qua Zalo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.youtubeButton]}
              onPress={handleYoutubeGuide}
            >
              <Text style={styles.buttonText}>Xem hướng dẫn trên Youtube</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <PromoCodeInputSheet
        isVisible={isPromoInputVisible}
        onClose={closePromoInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1000,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheetContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  header: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  title: {
    fontFamily: "Roboto Condensed",
    fontSize: 16,
    color: "#27272A",
  },
  content: {
    padding: 20,
  },
  priceSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  price: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#C81B22",
    marginBottom: 20,
    fontFamily: "Roboto Condensed",
  },
  includes: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    fontFamily: "Roboto Condensed",
  },
  benefit: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Roboto Condensed",
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
  button: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  purchaseButton: {
    backgroundColor: "#FEC41F",
  },
  zaloButton: {
    backgroundColor: "#0068FF",
  },
  youtubeButton: {
    backgroundColor: "#FF0000",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto Condensed",
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto Condensed",
    marginBottom: 10,
  },
  benefitContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  promoCodeEntryButton: {
    backgroundColor: "green",
  },
});
