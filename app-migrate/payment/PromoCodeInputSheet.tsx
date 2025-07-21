import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { usePayment } from "@/contexts/PaymentContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PromoCodeInputSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

const PromoCodeInputSheet = ({
  isVisible,
  onClose,
}: PromoCodeInputSheetProps) => {
  const [promoCode, setPromoCode] = useState("");
  const [email, setEmail] = useState("");
  const { bottom } = useSafeAreaInsets();
  const { submitPromotionCode, isSubmittingCode, submissionError } = usePayment();

  const handleSubmit = async () => {
    if (promoCode.trim() === "") {
      return;
    }
    const success = await submitPromotionCode(promoCode, email);
    if (success) {
      setPromoCode("");
      setEmail("");
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <Modal transparent animationType="slide" visible={isVisible}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={[styles.content, { paddingBottom: bottom + 20 }]}>
            <Text style={styles.title}>Nhập mã khuyến mãi</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mã khuyến mãi</Text>
              <TextInput
                style={styles.input}
                value={promoCode}
                onChangeText={setPromoCode}
                placeholder="Nhập mã khuyến mãi"
                placeholderTextColor="#999"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email (không bắt buộc)</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Nhập email của bạn"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {submissionError ? (
              <Text style={styles.errorText}>{submissionError}</Text>
            ) : null}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
                disabled={isSubmittingCode}
              >
                <Text style={styles.cancelButtonText}>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={isSubmittingCode || promoCode.trim() === ""}
              >
                {isSubmittingCode ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.buttonText}>Áp dụng</Text>
                )}
              </TouchableOpacity>
            </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Roboto Condensed",
    color: "#27272A",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "Roboto Condensed",
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: "Roboto Condensed",
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#FEC41F",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto Condensed",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto Condensed",
  },
  errorText: {
    color: "#C81B22",
    marginTop: 8,
    fontSize: 14,
    fontFamily: "Roboto Condensed",
  },
});

export default PromoCodeInputSheet; 