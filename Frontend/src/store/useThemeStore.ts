import { create } from "zustand";

interface ThemeStore {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: localStorage.getItem("steamify-theme") || "coffee",
  setTheme: (theme: string) => {
    localStorage.setItem("steamify-theme", theme);
    set({ theme });
  },
}));
