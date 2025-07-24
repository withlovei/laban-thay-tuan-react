import { useCallback } from 'react';
import { captureError, captureMessage, setUserContext, setExtraContext, setTag } from '../services/sentry';

export const useSentry = () => {
  const logError = useCallback((error: Error, context?: Record<string, any>) => {
    captureError(error, context);
  }, []);

  const logMessage = useCallback((message: string, level: 'info' | 'warning' | 'error' = 'info') => {
    captureMessage(message, level);
  }, []);

  const setUser = useCallback((user: { id: string; email?: string; username?: string }) => {
    setUserContext(user);
  }, []);

  const setExtra = useCallback((key: string, value: any) => {
    setExtraContext(key, value);
  }, []);

  const setUserTag = useCallback((key: string, value: string) => {
    setTag(key, value);
  }, []);

  return {
    logError,
    logMessage,
    setUser,
    setExtra,
    setTag: setUserTag,
  };
}; 