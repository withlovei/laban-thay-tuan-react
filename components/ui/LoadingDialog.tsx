import React from 'react';
import { StyleSheet, View, Modal, Text, ActivityIndicator, Animated } from 'react-native';

interface LoadingDialogProps {
  visible: boolean;
  progress?: number;
  message?: string;
  color?: string;
}

export const LoadingDialog: React.FC<LoadingDialogProps> = ({
  visible,
  progress = 0,
  message = 'Đang tải...',
  color = '#FEC41F'
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={styles.loadingDialog}>
          <ActivityIndicator size="large" color={color} />
          <Text style={styles.loadingText}>
            {message}
          </Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <Animated.View 
                style={[
                  styles.progressBarFill,
                  {
                    width: `${Math.round(progress * 100)}%`,
                    backgroundColor: color,
                  }
                ]} 
              />
            </View>
            <Text style={styles.percentageText}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingDialog: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  loadingText: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    textAlign: 'center'
  },
  progressBarContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4
  },
  percentageText: {
    fontSize: 14,
    color: '#666',
    minWidth: 45,
    textAlign: 'right'
  }
}); 