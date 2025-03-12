import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, FlatList, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface YearPickerProps {
  initialValue: number | null;
  onSelectYear: (year: number) => void;
  onClose: () => void;
}

export function YearPicker({ initialValue, onSelectYear, onClose }: YearPickerProps) {
  // Generate years from 1900 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
  
  const [selectedYear, setSelectedYear] = useState<number | null>(initialValue);

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    onSelectYear(year);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <ThemedText style={styles.title}>Select Year of Birth</ThemedText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={years}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.yearItem,
                  selectedYear === item && styles.selectedYearItem
                ]}
                onPress={() => handleYearSelect(item)}
              >
                <Text style={[
                  styles.yearText,
                  selectedYear === item && styles.selectedYearText
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={true}
            initialScrollIndex={initialValue ? years.indexOf(initialValue) : 0}
            getItemLayout={(data, index) => (
              { length: 50, offset: 50 * index, index }
            )}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '60%',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D4001D',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#D4001D',
  },
  yearItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  selectedYearItem: {
    backgroundColor: 'rgba(212, 0, 29, 0.1)',
  },
  yearText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
  selectedYearText: {
    color: '#D4001D',
    fontWeight: 'bold',
  },
}); 