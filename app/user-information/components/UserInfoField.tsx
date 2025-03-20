import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardTypeOptions,
} from "react-native";

interface UserInfoFieldProps {
  title: string;
  value: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  isDropdown?: boolean;
  editable?: boolean;
}

export function UserInfoField({
  title,
  value,
  onChangeText,
  onPress,
  keyboardType = "default",
  maxLength,
  isDropdown = false,
  editable = true,
}: UserInfoFieldProps) {
  const Container = isDropdown ? TouchableOpacity : View;
  const renderInput = () => {
    if (isDropdown) {
      return (
        <Text style={[styles.inputText, !value && styles.placeholderText]}>
          {value || "Chọn năm sinh"}
        </Text>
      );
    }

    return (
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        placeholderTextColor="grey"
        editable={editable}
        scrollEnabled={false}
      />
    );
  };

  return (
    <Container style={styles.container} activeOpacity={0.7} onPress={onPress}>
      <Text style={styles.label}>{title}</Text>
      {renderInput()}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D69C66",
  },
  label: {
    fontFamily: "Voltaire Regular",
    color: "#EAD196",
  },
  input: {
    fontSize: 14,
    color: "#FEC41F",
    fontFamily: "Voltaire Regular",
  },
  inputText: {
    fontSize: 14,
    fontFamily: "Voltaire Regular",
    color: "#FEC41F",
  },
  placeholderText: {
    color: "rgba(255, 255, 255, 0.5)",
  },
});
