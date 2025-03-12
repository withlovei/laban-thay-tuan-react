import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { TextStyles } from '../../../constants/TextStyles';

interface GenderCheckBoxProps {
  selectedGender: 'MALE' | 'FEMALE' | null;
  onSelectGender: (gender: 'MALE' | 'FEMALE') => void;
}

export function GenderCheckBox({ selectedGender, onSelectGender }: GenderCheckBoxProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={[styles.label, TextStyles.bodyMedium]}>Gender</ThemedText>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedGender === 'MALE' && styles.selectedOption
          ]}
          onPress={() => onSelectGender('MALE')}
        >
          <View style={styles.checkboxContainer}>
            <View style={[
              styles.checkbox,
              selectedGender === 'MALE' && styles.selectedCheckbox
            ]} />
          </View>
          <Text style={[styles.optionText, TextStyles.bodyMedium]}>Male</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.option,
            selectedGender === 'FEMALE' && styles.selectedOption
          ]}
          onPress={() => onSelectGender('FEMALE')}
        >
          <View style={styles.checkboxContainer}>
            <View style={[
              styles.checkbox,
              selectedGender === 'FEMALE' && styles.selectedCheckbox
            ]} />
          </View>
          <Text style={[styles.optionText, TextStyles.bodyMedium]}>Female</Text>
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
  },
  label: {
    color: 'white',
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkbox: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  selectedCheckbox: {
    backgroundColor: 'white',
  },
  optionText: {
    color: 'white',
  },
}); 