import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardTypeOptions,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { TextStyles } from "../../../constants/TextStyles";

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
  const renderInput = () => {
    if (isDropdown) {
      return (
        <TouchableOpacity
          style={[styles.input, styles.dropdownInput]}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Text style={[styles.inputText, !value && styles.placeholderText]}>
            {value || "Select year"}
          </Text>
          <Ionicons name="chevron-down" size={20} color="white" />
        </TouchableOpacity>
      );
    }

    return (
      <TextInput
        style={[styles.input, { color: "black" }]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        placeholderTextColor="grey"
        editable={editable}
      />
    );
  };

  return (
    <View>
      <ThemedText style={[styles.label, TextStyles.bodyMedium]}>
        {title}
      </ThemedText>
      {renderInput()}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "white",
    marginBottom: 5,
  },
  input: {
    borderRadius: 30,
    backgroundColor: "white",
    height: 40,
    // borderWidth: 1,
    // borderColor: "white",
    paddingHorizontal: 12,
    fontSize: 16,
  },
  dropdownInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputText: {
    fontSize: 16,
    color: "white",
  },
  placeholderText: {
    color: "rgba(255, 255, 255, 0.5)",
  },
});
