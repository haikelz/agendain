import { StateCreator } from "zustand";
import { browser } from "~/lib/utils/constants";
import { DarkModeSliceProps } from "~/types";

type Theme = "light" | "dark";

const localValue = (browser ? localStorage.getItem("theme") : "light") as Theme;
const systemTheme: Theme =
  browser && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const darkModeSlice: StateCreator<DarkModeSliceProps, [], [], DarkModeSliceProps> = (set) => ({
  darkMode: localValue || systemTheme,
  setDarkMode: (darkMode) => set({ darkMode: darkMode }),
});

export default darkModeSlice;
