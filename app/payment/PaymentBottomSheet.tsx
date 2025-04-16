import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { requestPurchase } from "react-native-iap";
import { screen } from "@/constants/Dimensions";
import { usePayment } from "@/contexts/PaymentContext";
import { IconCheckMark } from "@/components/ui/icons/IconCheckMark";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const productIds = ["laban.full.access"];

export const PaymentBottomSheet = () => {
  const [loading, setLoading] = useState(false);
  const { top } = useSafeAreaInsets();
  const { isInitialized, productInfo, isPaymentVisible: isVisible } = usePayment();

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
        await requestPurchase({ skus: productIds });
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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
      />
      <View
        style={[
          styles.bottomSheetContainer,
          { top: screen.height + top - 510 },
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    elevation: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheetContainer: {
    width: "100%",
    backgroundColor: "#FFF",
    position: "absolute",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  line: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E5E5",
    borderRadius: 2,
    position: "absolute",
    top: 8,
  },
  title: {
    fontFamily: "Roboto Condensed",
    fontSize: 16,
    color: "#27272A",
  },
  closeText: {
    fontSize: 24,
    color: "#272729",
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
    marginBottom: 8,
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
  },
});
