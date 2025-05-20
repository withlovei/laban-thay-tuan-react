import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  Keyboard,
} from "react-native";
import { usePayment } from "@/contexts/PaymentContext";
import { useUserStore } from "@/stores/useUserStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { screen } from "@/constants/Dimensions";

interface PromoCodeInputSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

const PromoCodeInputSheet: React.FC<PromoCodeInputSheetProps> = ({
  isVisible,
  onClose,
}) => {
  const { top } = useSafeAreaInsets();
  const {
    submitPromotionCode,
    isSubmittingCode,
    submissionError,
  } = usePayment();

  const [localPromotionCode, setLocalPromotionCode] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (!localPromotionCode.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập mã khuyến mãi.');
      return;
    }
    const promotionCode = localPromotionCode.trim().toUpperCase();
    const success = await submitPromotionCode(promotionCode, email.trim() || undefined); // Get success status

    if (success && isVisible) {
      // If successful and this modal is still visible
      onClose(); // Close this promo input sheet
    }
    // submitPromotionCode in context handles success (alerts, hides payment)
    // If submission was successful (no error) and the sheet is still visible, close it.
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalBackdrop}
        activeOpacity={1}
        onPress={onClose}
      />
      <View
        style={[
          styles.bottomSheetContainer,
          { paddingBottom: top + 20, maxHeight: screen.height * 0.6 },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Nhập Mã Khuyến Mãi</Text>
        </View>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Mã khuyến mãi"
            value={localPromotionCode}
            onChangeText={(text) => setLocalPromotionCode(text.toUpperCase())}
            autoCapitalize="characters"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#888"
          />
          {submissionError && (
            <Text style={styles.errorText}>{submissionError}</Text>
          )}
          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
            disabled={isSubmittingCode || !localPromotionCode.trim()}
          >
            {isSubmittingCode ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Lưu</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    paddingTop: 10, // Adjusted padding
  },
  header: {
    height: 40, // Reduced height
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15, // Added margin
  },
  title: {
    fontFamily: "Roboto Condensed",
    fontSize: 18, // Increased size
    fontWeight: "bold",
    color: "#27272A",
  },
  content: {
    // Removed flex:1 to allow sheet to size to content up to maxHeight
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: "Roboto Condensed",
    marginBottom: 15, // Increased margin
    color: "#333",
  },
  button: {
    width: "100%",
    paddingVertical: 15, // Increased padding
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButton: {
    backgroundColor: "#28a745", // Green color
    marginTop: 10, // Added margin
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto Condensed",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    fontFamily: "Roboto Condensed",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default PromoCodeInputSheet;
