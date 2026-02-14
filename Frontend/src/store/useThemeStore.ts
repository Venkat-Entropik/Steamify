import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("steamify-theme") || "coffee",
  setTheme: (theme: string) => {
    localStorage.setItem("steamify-theme", theme);
    set({ theme });
  },
}));
