import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface YearPickerProps {
  initialValue: number | null;
  onSelectYear: (year: number) => void;
  onClose: () => void;
}

const currentYear = new Date().getFullYear();
const YEARS = Array.from(
  { length: currentYear - 1900 + 1 },
  (_, i) => currentYear - i
);
export function YearPicker({
  initialValue,
  onSelectYear,
  onClose,
}: YearPickerProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(
    initialValue || currentYear
  );

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
  };

  const handleDone = () => {
    if (selectedYear) {
      onSelectYear(selectedYear);
    }
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalContent}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelButton}>Hủy</Text>
            </TouchableOpacity>
            <ThemedText style={styles.title}>Năm sinh</ThemedText>
            <TouchableOpacity onPress={handleDone}>
              <Text style={styles.doneButton}>Chọn</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={YEARS}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.yearItem,
                  selectedYear === item && styles.selectedYearItem,
                ]}
                onPress={() => handleYearSelect(item)}
              >
                <Text
                  style={[
                    styles.yearText,
                    selectedYear === item && styles.selectedYearText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={true}
            initialScrollIndex={initialValue ? YEARS.indexOf(initialValue) : 0}
            getItemLayout={(_data, index) => ({
              length: 50,
              offset: 50 * index,
              index,
            })}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    height: "60%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    color: "#007AFF",
    fontSize: 16,
  },
  doneButton: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  pickerItem: {
    fontSize: 18,
    height: 150,
  },
  yearItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  selectedYearItem: {
    backgroundColor: "rgba(212, 0, 29, 0.1)",
  },
  yearText: {
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
  },
  selectedYearText: {
    color: "#D4001D",
    fontWeight: "bold",
  },
});
