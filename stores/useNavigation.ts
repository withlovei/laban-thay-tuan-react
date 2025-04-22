import { create } from "zustand";

export type Screen =
  | "map"
  | "compass-only"
  | "stars-pdf"
  | "minh-tuan-book-pdf"
  | "solution-pdf"
  | "mat-phap-book-pdf"
  | "phong-thuy-nha-o-book-pdf"
  | "huong-nha-book.pdf";
interface NavigationState {
  // Current active screen or route
  currentScreen: Screen;
  // Actions
  navigateTo: (screen: Screen) => void;
}

const useNavigation = create<NavigationState>((set) => ({
  currentScreen: "map",
  navigateTo: (screen: Screen) =>
    set(() => ({
      currentScreen: screen,
    })),
}));

export default useNavigation;
