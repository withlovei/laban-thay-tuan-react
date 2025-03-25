import { create } from 'zustand'
import { User } from '@/types/user'

interface UserState {
  user: User | null
  setUser: (user: User) => void
  updateUser: (updates: Partial<User>) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (updates) => set((state) => ({
    user: state.user ? { ...state.user, ...updates } : null
  })),
  clearUser: () => set({ user: null }),
})) 