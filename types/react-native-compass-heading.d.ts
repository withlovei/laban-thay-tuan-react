declare module 'react-native-compass-heading' {
  interface CompassHeading {
    start: (degree_update_rate: number, callback: (data: { heading: number }) => void) => void;
    stop: () => void;
  }

  const compass: CompassHeading;
  export default compass;
} 