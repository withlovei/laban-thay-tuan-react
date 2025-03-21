import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";

interface PickerProps {
  initialValue?: string;
  onSelectValue: (value: string) => void;
  onClose: () => void;
  title: string;
  data: string[];
}

export function Picker({
  initialValue,
  onSelectValue,
  onClose,
  title,
  data,
}: PickerProps) {
  const [selected, setSelected] = useState<string | undefined>(initialValue);

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const handleDone = () => {
    if (selected) {
      onSelectValue(selected);
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
        id={title}
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
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={handleDone}>
              <Text style={styles.doneButton}>Chọn</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.yearItem,
                  selected === item && styles.selectedYearItem,
                ]}
                onPress={() => handleSelect(item)}
              >
                <Text
                  style={[
                    styles.yearText,
                    selected === item && styles.selectedYearText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={true}
            initialScrollIndex={initialValue ? data.indexOf(initialValue) : 0}
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
    maxHeight: "60%",
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
