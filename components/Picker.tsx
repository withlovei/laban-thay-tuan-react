import { BOTTOM_BAR_HEIGHT, screen } from "@/constants/Dimensions";
import WheelPicker from "@quidone/react-native-wheel-picker";
import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const { top, bottom } = useSafeAreaInsets();
  const selectedRef = useRef<string | undefined>();

  const handleSelect = (value: string) => {
    selectedRef.current = value;
  };

  const handleDone = () => {
    if (selectedRef.current) {
      onSelectValue(selectedRef.current);
    } else {
      onSelectValue(data[0]);
    }
    onClose();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />
      <View
        style={[
          styles.bottomSheetContainer,
          {
            top: screen.height - bottom - 280 - BOTTOM_BAR_HEIGHT,
          },
        ]}
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
        <View style={styles.content}>
          <WheelPicker
            data={data.map((item) => ({ value: item, label: item }))}
            value={initialValue}
            onValueChanging={({ item: { value } }) => handleSelect(value)}
          />
        </View>
        {/* To prevent gap between bottom sheet and bottom bar */}
        <View style={styles.footer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 100,
    backgroundColor: "#F5F5F7",
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
  picker: {
    width: "100%",
  },
  container: {
    ...StyleSheet.absoluteFillObject,
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
    position: "relative",
    justifyContent: "space-between",
    paddingHorizontal: 20,
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
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 8,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    fontSize: 24,
    color: "#272729",
  },
  content: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
});
