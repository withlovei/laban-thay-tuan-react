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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
    const success = await submitPromotionCode(promotionCode, email.trim() || undefined);

    if (success && isVisible) {
      onClose();
    }
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardAvoidingView}
      >
        <View
          style={[
            styles.bottomSheetContainer,
            { paddingBottom: top + 20, maxHeight: screen.height * 0.5 },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Nhập Mã Khuyến Mãi</Text>
          </View>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.content}
            enableOnAndroid={true}
            enableAutomaticScroll={false}
            extraScrollHeight={0}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          >
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
          </KeyboardAwareScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  keyboardAvoidingView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomSheetContainer: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  title: {
    fontFamily: "Roboto Condensed",
    fontSize: 18,
    fontWeight: "bold",
    color: "#27272A",
  },
  content: {
    paddingVertical: 10,
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
    marginBottom: 15,
    color: "#333",
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButton: {
    backgroundColor: "#28a745",
    marginTop: 10,
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
