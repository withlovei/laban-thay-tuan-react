import CompassHeading from "react-native-compass-heading";
import { AppState } from "react-native";

type CompassCallback = (heading: number) => void;

class CompassService {
  private static instance: CompassService;
  private callbacks: Set<CompassCallback> = new Set();
  private isStarted: boolean = false;
  private appStateListener: any = null;

  private constructor() {
    this.setupAppStateListener();
  }

  public static getInstance(): CompassService {
    if (!CompassService.instance) {
      CompassService.instance = new CompassService();
    }
    return CompassService.instance;
  }

  private setupAppStateListener() {
    this.appStateListener = AppState.addEventListener('change', this.handleAppStateChange);
  }

  private handleAppStateChange = (nextAppState: string) => {
    console.log("CompassService AppState changed to:", nextAppState);
    if (nextAppState === "active") {
      this.startIfNeeded();
    } else if (nextAppState === "background" || nextAppState === "inactive") {
      this.stop();
    }
  };

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
      console.log("CompassService started");
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
      console.log("CompassService stopped");
    }
  }

  public destroy() {
    if (this.appStateListener) {
      this.appStateListener.remove();
      this.appStateListener = null;
    }
    this.stop();
  }
}

export const compassService = CompassService.getInstance();
