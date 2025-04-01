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
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  isDropdown?: boolean;
  editable?: boolean;
  placeholder?: string;
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
  placeholder = "",
}: UserInfoFieldProps) {
  const Container = isDropdown ? TouchableOpacity : View;
  const renderInput = () => {
    if (isDropdown) {
      return (
        <Text style={[styles.inputText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
      );
    }

    return (
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        placeholderTextColor="grey"
        editable={editable}
        scrollEnabled={false}
        placeholder={placeholder}
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
    fontFamily: "Roboto Condensed",
    color: "#EAD196",
    fontSize: 14,
  },
  input: {
    fontSize: 16,
    color: "#FEC41F",
    fontFamily: "Roboto Condensed",
  },
  inputText: {
    fontSize: 16,
    fontFamily: "Roboto Condensed",
    color: "#FEC41F",
  },
  placeholderText: {
    color: "rgba(255, 255, 255, 0.5)",
  },
});
