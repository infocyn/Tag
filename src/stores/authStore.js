import create from 'zustand';
import { persist } from 'zustand/middleware';

// This is a simple auth store for demo purposes
// In a real app, you would implement proper authentication
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: (userData) => set({ 
        user: userData, 
        isAuthenticated: true 
      }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false 
      }),
      
      updateUser: (userData) => set((state) => ({
        user: { ...state.user, ...userData }
      })),
    }),
    {
      name: 'auth-storage',
    }
  )
);