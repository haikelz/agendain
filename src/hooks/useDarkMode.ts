import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const browser: boolean = typeof window !== "undefined";
const localValue = (browser ? localStorage.getItem("theme") : "light") as Theme;
const systemTheme: Theme =
  browser && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState<Theme>(localValue || systemTheme);

  useEffect(() => {
    if (!browser) return;

    localStorage.setItem("theme", darkMode);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(darkMode);
  }, [darkMode]);

  return [darkMode, setDarkMode] as const;
};
