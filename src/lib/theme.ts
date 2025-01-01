import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        set({ theme });
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Initialize theme
if (typeof window !== 'undefined') {
  const root = window.document.documentElement;
  const initialTheme = root.classList.contains('dark') ? 'dark' : 'light';
  useTheme.getState().setTheme(initialTheme);
}