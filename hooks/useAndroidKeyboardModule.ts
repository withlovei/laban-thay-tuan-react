import { NativeModules, Platform } from 'react-native';

type SoftInputMode = 'resize' | 'pan' | 'nothing' | 'unspecified';

interface IKeyboardModule {
  setSoftInputMode(mode: SoftInputMode): void;
}

const { KeyboardModule } = NativeModules;

/**
 * Hook to control Android's window soft input mode
 * @returns Object containing setSoftInputMode function
 * @example
 * ```tsx
 * const { setSoftInputMode } = useAndroidKeyboardModule();
 * 
 * // Set the soft input mode
 * setSoftInputMode('resize');
 * ```
 */
export const useAndroidKeyboardModule = (): IKeyboardModule => {
  if (Platform.OS !== 'android') {
    return {
      setSoftInputMode: (_mode: SoftInputMode) => {
        // No-op for non-Android platforms
        console.warn('KeyboardModule is only available on Android');
      },
    };
  }

  const setSoftInputMode = (mode: SoftInputMode) => {
    try {
      KeyboardModule.setSoftInputMode(mode);
    } catch (error) {
      console.error('Failed to set soft input mode:', error);
    }
  };

  return {
    setSoftInputMode,
  };
};

// Export types for use in other files
export type { SoftInputMode }; 