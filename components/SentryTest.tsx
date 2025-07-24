import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { useSentry } from '../hooks/useSentry';

const SentryTest: React.FC = () => {
  const { logError, logMessage, setExtra } = useSentry();

  const testCrash = () => {
    // This will cause a crash and be captured by Sentry
    throw new Error('Test crash from SentryTest component');
  };

  const testErrorLogging = () => {
    try {
      // Simulate an error
      const obj: any = null;
      obj.someMethod(); // This will throw an error
    } catch (error) {
      logError(error as Error, {
        component: 'SentryTest',
        action: 'testErrorLogging',
      });
    }
  };

  const testMessageLogging = () => {
    logMessage('Test message from SentryTest component', 'info');
    setExtra('test_timestamp', new Date().toISOString());
  };

  const testSentryCapture = () => {
    Sentry.captureException(new Error('Direct Sentry capture test'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sentry Test Component</Text>
      <Text style={styles.description}>
        Use these buttons to test Sentry crash monitoring
      </Text>
      
      <TouchableOpacity style={styles.button} onPress={testCrash}>
        <Text style={styles.buttonText}>Test Crash</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={testErrorLogging}>
        <Text style={styles.buttonText}>Test Error Logging</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={testMessageLogging}>
        <Text style={styles.buttonText}>Test Message Logging</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={testSentryCapture}>
        <Text style={styles.buttonText}>Test Direct Sentry Capture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SentryTest; 