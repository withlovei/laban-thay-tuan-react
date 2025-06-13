import CompassHeading from "react-native-compass-heading";
// import { AppState } from "react-native";

type CompassCallback = (heading: number) => void;

class CompassService {
  private static instance: CompassService;
  private callbacks: Set<CompassCallback> = new Set();
  private isStarted: boolean = false;

  private constructor() {
    this.startIfNeeded();
  }

  public static getInstance(): CompassService {
    if (!CompassService.instance) {
      CompassService.instance = new CompassService();
    }
    return CompassService.instance;
  }

  // private handleAppStateChange = (nextAppState: string) => {
  //   if (nextAppState === "active") {
  //     this.startIfNeeded();
  //   } else if (nextAppState === "background" || nextAppState === "inactive") {
  //     this.stop();
  //   }
  // };

  private startIfNeeded() {
    if (this.callbacks.size > 0 && !this.isStarted) {
      const degree_update_rate = 0.001;
      CompassHeading.start(
        degree_update_rate,
        ({ heading }: { heading: number }) => {
          this.callbacks.forEach((callback) => callback(heading));
        }
      );
      this.isStarted = true;
    }
  }

  public subscribe(callback: CompassCallback) {
    console.log("CompassService subscribe");
    this.callbacks.add(callback);
    this.startIfNeeded();
    return callback;
  }

  public unsubscribe(callback: CompassCallback) {
    console.log("CompassService unsubscribe");
    this.callbacks.delete(callback);
    if (this.callbacks.size === 0) {
      this.stop();
    }
  }

  private stop() {
    if (this.isStarted) {
      CompassHeading.stop();
      this.isStarted = false;
    }
  }
}

export const compassService = CompassService.getInstance();
