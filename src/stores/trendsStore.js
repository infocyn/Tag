import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useTrendsStore = create(
  persist(
    (set) => ({
      favorites: [],
      history: [],
      
      addToFavorites: (hashtag) => set((state) => ({
        favorites: [...state.favorites, { 
          hashtag, 
          addedAt: new Date().toISOString(),
        }]
      })),
      
      removeFromFavorites: (hashtag) => set((state) => ({
        favorites: state.favorites.filter(item => item.hashtag !== hashtag)
      })),
      
      addToHistory: (hashtag) => set((state) => {
        // Only keep last 50 items in history
        const newHistory = [
          { hashtag, viewedAt: new Date().toISOString() },
          ...state.history
        ].slice(0, 50);
        
        return { history: newHistory };
      }),
      
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'trends-storage',
    }
  )
);