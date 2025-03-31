import { create } from 'zustand';

export type Screen = 'user-information' | 'map' | 'compass-only' | 'stars-pdf' | 'minh-tuan-book-pdf' | 'solution-pdf';
interface NavigationState {
  // Current active screen or route
  currentScreen: Screen;
  // Actions
  navigateTo: (screen: Screen) => void;
}

const useNavigation = create<NavigationState>((set) => ({
  currentScreen: 'user-information',
  navigateTo: (screen: Screen) => set(() => ({
    currentScreen: screen,
  })),
}));

export default useNavigation;
