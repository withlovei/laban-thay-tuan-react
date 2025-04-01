import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { TextStyles } from "../constants/TextStyles";

interface GenderCheckBoxProps {
  selectedGender: "MALE" | "FEMALE" | null;
  onSelectGender: (gender: "MALE" | "FEMALE") => void;
}

export function GenderCheckBox({
  selectedGender,
  onSelectGender,
}: GenderCheckBoxProps) {
  const [width, setWidth] = useState(0);
  return (
    <View
      style={styles.container}
      onLayout={({ nativeEvent }) => setWidth(nativeEvent.layout.width - 32)}
    >
      <Text style={[styles.label, { width: width / 3 }]}>Giới tính</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedGender === "MALE" && styles.selectedOption,
            { width: width / 3 },
          ]}
          onPress={() => onSelectGender("MALE")}
        >
          <View style={styles.checkboxContainer}>
            <View
              style={[
                styles.checkbox,
                selectedGender === "MALE" && styles.selectedCheckbox,
              ]}
            />
          </View>
          <Text style={[styles.optionText]}>Nam</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            selectedGender === "FEMALE" && styles.selectedOption,
            { width: width / 3 },
          ]}
          onPress={() => onSelectGender("FEMALE")}
        >
          <View style={styles.checkboxContainer}>
            <View
              style={[
                styles.checkbox,
                selectedGender === "FEMALE" && styles.selectedCheckbox,
              ]}
            />
          </View>
          <Text style={[styles.optionText]}>Nữ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#D69C66",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  label: {
    color: "#EAD196",
    fontSize: 14,
    fontFamily: "Roboto Condensed",
    fontWeight: 400,
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 4,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  selectedOption: {
    // Add any styling for selected option if needed
  },
  checkboxContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FEC41F",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkbox: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "transparent",
  },
  selectedCheckbox: {
    backgroundColor: "#FEC41F",
  },
  optionText: {
    color: "#FEC41F",
    fontSize: 16,
    fontFamily: "Roboto Condensed",
    fontWeight: 500,
  },
});
