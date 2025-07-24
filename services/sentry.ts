import * as Sentry from '@sentry/react-native';

// Initialize Sentry with your DSN
// Replace 'YOUR_SENTRY_DSN' with your actual Sentry DSN from your Sentry project
const SENTRY_DSN = 'https://7fa13887d3008238d548fd25f359517a@o4509393010032640.ingest.us.sentry.io/4509721722290176';

export const initSentry = () => {
  Sentry.init({
    dsn: SENTRY_DSN,
    // Enable performance monitoring
    // enableAutoSessionTracking: true,
    // Enable debug mode in development
    // debug: __DEV__,
    // Set environment
    // environment: __DEV__ ? 'development' : 'production',
    // Enable native crash handling
    enableNative: true,
    // Add more context data to events (IP address, cookies, user, etc.)
    sendDefaultPii: true,
    // Configure beforeSend to filter out certain errors
    // beforeSend(event) {
    //   // Filter out certain errors if needed
    //   if (event.exception) {
    //     // Example: Filter out specific error types
    //     // if (event.exception.values?.[0]?.type === 'NetworkError') {
    //     //   return null;
    //     // }
    //   }
    //   return event;
    // },
    // // Configure integrations
    // integrations: [
    //   // Add any additional integrations here
    // ],
  });
};

// Helper function to capture errors manually
export const captureError = (error: Error, context?: Record<string, any>) => {
  Sentry.captureException(error, {
    extra: context,
  });
};

// Helper function to capture messages
export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info') => {
  Sentry.captureMessage(message, level);
};

// Helper function to set user context
export const setUserContext = (user: { id: string; email?: string; username?: string }) => {
  Sentry.setUser(user);
};

// Helper function to set extra context
export const setExtraContext = (key: string, value: any) => {
  Sentry.setExtra(key, value);
};

// Helper function to set tag
export const setTag = (key: string, value: string) => {
  Sentry.setTag(key, value);
};

export default Sentry; 